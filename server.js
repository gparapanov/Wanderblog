/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

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
    password: 'password',
    database: 'wanderblog'
});

connection.connect();

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
app.set('port', process.env.PORT || 8080);
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


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//ROUTES
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/login', routes.login);
app.get('/newPost', routes.newPost);
app.get('/profile', routes.profile);
app.get('/adventures', routes.profile);

//profile page
app.get('/profile', function (req, res) {
    res.render('profile.jade');
});

//adventures
app.get('/adventures', function (req, res) {
    res.render('adventures.jade');
});


//Login
app.get('/login', function (req, res) {
    res.render('login.jade');
});

app.post('/login', function (req, res) {
    user = req.session;
    var loginData = {
        login_name: req.body.login_name,
        password: req.body.password
    };

    var query = connection.query("SELECT * from users WHERE login_name=? AND password=? LIMIT 1", [loginData.login_name, loginData.password], function (err, rows, fields) {

        var user = req.session;
        if (rows.length != 0) {
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
            res.render('login.jade', {error: ' Invalid email or password.'});
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
    var user = {
        name: req.body.name,
        login_name: req.body.login_name,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        type: req.body.type

    };

    var query = connection.query('insert into users set ?', user, function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.error(result);
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

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
