/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var bcrypt = require('bcryptjs');

//Body-parser
var bodyParser = require('body-parser');

//cookies
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

//favicon
var favicon = require('serve-favicon');

var mysql = require('mysql');
var connection = mysql.createConnection({
    //Here put credentials for your local sql.
    host: 'localhost',
    user: 'root',
    password: 'georgi',
    database: 'wanderblog'
});

connection.connect(function(err){
    //catch connection error
    if(err){
        console.error("Error connecting: " + err.stack);
        return;
    }
    console.log("Connected to mysql servers as id: "+connection.threadId);
});

app.use(bodyParser.urlencoded({extended: true}));
//cookies
app.use(cookieParser());
app.use(multer());
app.use(session({
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 6000},
    secret: 'uwotm8'
}));

// all environments
app.set('port', process.env.PORT || 8011);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(__dirname + '/images/favicon.ico'));

app.locals.pretty = true;

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
//georgi
//ROUTES
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/login', routes.login);
app.get('/newPost', routes.newPost);
app.get('/profile', routes.profile);
//app.get('/adventures', routes.adventures);
app.get('/adventure', routes.adventure);

//profile page
app.get('/profile', function (req, res) {
    res.render('profile.jade');
});

//adventures
app.get('/adventures', function (req, res) {
    // Description of adventure needs to be added,
    // query for amount of comments
    // pictures/avatar
    connection.query("SELECT u.login_name, u.avatar, u.id, a.visit_date, a.title, a.location, a.user_id FROM users as u INNER JOIN adventure AS a ON u.id = a.user_id", function (err, rows) {
        //catch connection error
        if(err){
            console.error("Error connecting: " + err.stack);
            return;
        }
        var adventures = [];
        for (i = 0; i < rows.length; i++) {
            var adv = {
                title: rows[i].title,
                login_name: rows[i].login_name,
                avatar: rows[i].avatar,
                location: rows[i].location,
                visit_date: rows[i].visit_date,
                post_date: rows[i].post_date,
                user_id: rows[i].user_id
            };
            adventures.push(adv);
        }
        res.render('adventures', {adventures: adventures});
    });

});


app.get('/adventure', function (req, res) {
    res.render('adventure.jade');
});


//Login
app.get('/login', function (req, res) {
    res.render('login.jade');
});

app.post('/login', function (req, res) {
    var loginData = {
        login_name: req.body.login_name,
        password: req.body.password
    };
    connection.query("SELECT * from users WHERE login_name=? LIMIT 1", [loginData.login_name], function (err, rows) {
        //catch connection error
        if(err){
            console.error("Error connecting: " + err.stack);
            return;
        }
        var user = req.session;
        if (rows.length != 0) {
            if(bcrypt.compareSync(loginData.password,rows[0].password)) {
                user.type = rows[0].type;
                user.name = rows[0].name;
                user.login_name = rows[0].login_name;
                user.email = rows[0].email;
                user.description = rows[0].description;
                user.country = rows[0].country;
                user.avatar = rows[0].avatar;

                res.render('profile', {
                    type: user.type,
                    name: user.name,
                    login_name: user.login_name,
                    email: user.email,
                    description: user.description,
                    country: user.country,
                    avatar: user.avatar,
                    title: 'Login',
                    year: new Date().getFullYear(),
                    message: 'Your login page'
                });
            } else {
                res.render('login.jade', {error: ' Invalid username or password.'});
            }
        } else {
            res.render('login.jade', {error: ' Invalid username or password.'});
        }
    });

});


//Registration
app.get('/register', function (req, res) {
    res.render('register.jade');
});

app.post('/register', function (req, res) {
    //res.json(req.body);
    //res.render('register.jade');
    var password_hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    var user = {
        name: req.body.name,
        login_name: req.body.login_name,
        email: req.body.email,
        password: password_hash,
        country: req.body.country,
        type: req.body.type

    };

    connection.query('insert into users set ?', user, function (err, result) {
        //catch mysql connection error
        if (err) {
            console.error(err);
            return;
        }
    });
    res.redirect('/profile');
});

app.post('register', function (req, res) {
    res.send(req.body.optradio);
});

//Adventures

app.get('/newPost', function (req, res) {
    res.render('newPost.jade');
});

app.post('/search', function(req,res){
    var searched = req.body.searchedFor;
    var searchedFilter = req.body.search_filter_options;

    var query = 'SELECT title, uploaded, location, uploader, AVG(r.score) AS averageScore FROM (SELECT a.id AS adventure_id, a.title, a.post_date AS uploaded, a.location, u.login_name AS uploader, u.name FROM adventure AS a INNER JOIN users AS u ON a.user_id = u.id) a_u INNER JOIN rating AS r ON a_u.adventure_id = r.adventure_id';
    if(searched && searchedFilter){
        if(searchedFilter == 'date'){
            query += ' GROUP BY a_u.adventure_id HAVING uploaded ' + req.body.date;
            query += req.body.beforeafter == 'before' ? '< ' : '> ';
            query += req.body.date;
        }else if(searchedFilter == 'rating'){
            query += ' GROUP BY a_u.adventure_id HAVING averageScore > ' + req.body.rating;
        }else if(searchedFilter == 'author'){
            query += ' GROUP BY a_u.adventure_id HAVING a_u.name LIKE "%'+req.body.user_name+'%"';
        }else if(searchedFilter == 'keywords'){
            var keywords = req.body.keywords.split(",");
            query += '';
            query += ' WHERE t.name LIKE "%' + keywords.join('%" OR t.name LIKE "%') + '%"';
        }
        query += ' AND title LIKE "%'+searched+'%";';
        console.log(query);
    }

    connection.query('SELECT * from adventure WHERE title LIKE ?', '%'+[searched]+'%', function(err, rows){
        if(err){
            console.log(err.stack);
            res.render('index.jade');
            return;
        }
        if(rows.length <= 0){
            res.render('search.jade', {noticeresults: 'Nothing found for your search term, please try again', searchedFor:searched});
        }else{
            res.render('search.jade', {noticeresults: 'Following adventures found!', searchResult:rows, searchedFor:searched});
        }
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

