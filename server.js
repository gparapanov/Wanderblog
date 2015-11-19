
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//cookies
var sessions = require('client-sessions');


var app = express();

//favicon
var favicon = require('serve-favicon');

//Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var mysql = require('mysql');
var connection = mysql.createConnection({
    //Here put credentials for your local sql.
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'wanderblog'
});

connection.connect();

//mysql-model
//var mysqlModel = require('mysql-model');
//var MyAppModel = mysqlModel.createConnection({
//    host     : 'localhost',
//    user     : 'root',
//    password : 'password',
//    database : 'wanderblog'
//});

//var User = new MyAppModel({tableName: "users"});

//COOKIES
app.use(sessions({
    cookieName: 'session',
    //hashing
    secret: 'b23iujnxklm23mcoenUOifj!xxaXSBf2nn',
    //when will log off
    duration: 30*60*1000,
    activeDuration: 5*60*1000,

}));


// all environments
app.set('port', process.env.PORT || 3000);
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

var credentials = {
    login_name: "",
    name: "",
    country: "",
    type: ""
};


//profile page
app.get('/profile', function(req,res){
    console.log('kasdkas');
    if(req.session.credentials && req.session){
            console.log("KSAKDK");
            res.session.credentials = credentials;
            console.log('KAKSDKSAFKSKFKSAKF');
            res.render('profile.jade');

    }
    else{
        req.session.reset();
        res.redirect('/login');
        console.log('123KAKSDKSAFKSKFKSAKF');
    }
});


//Login
app.get('/login', function(req,res){
   res.render('login.jade');
});




app.post('/login', function(req,res){

    var loginData = {
        login_name: req.body.login_name,
        password: req.body.password
    };

    console.log(credentials);
    //var query = connection.query('SELECT * FROM users where login name = credentials.login.name');
    var query = connection.query("SELECT * from users WHERE login_name=? AND password=? LIMIT 1",[loginData.login_name,loginData.password],function(err, rows, fields) {
        if(rows.length != 0){
            credentials.login_name = rows[0].login_name;
            credentials.name = rows[0].name;
            credentials.country = rows[0].country;
            credentials.type = rows[0].type;

            req.session.credentials = credentials;
            console.log(req.session.credentials);
            res.redirect('/profile');
            res.render('profile.jade', {error: ' Successfully logged in.'});
        }else {
            res.render('login.jade', {error: ' Invalid email or password.'});
        }
    });
    console.log(credentials);
});


//Registration
app.get('/register', function(req,res){
    res.render('register.jade');
});

app.post('/register', function(req,res){
    //res.json(req.body);
    //res.render('register.jade');
    var user = {
        name: req.body.name,
        login_name: req.body.login_name,
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
    res.redirect('/newPost');
});

app.post('register', function(req, res) {
    res.send(req.body.optradio);
});

//Adventures

app.get('/newPost', function(req,res){
    res.render('newPost.jade');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
