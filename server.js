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
var db = null;
module.exports = function () {
    if(!db) {
        db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'wanderblog'
        });
    }
    return db;
};

//connection.connect(function (err) {
//    //catch connection error
//    if (err) {
//        console.error("Error connecting: " + err.stack);
//        return;
//    }
//    console.log("Connected to mysql servers as id: " + connection.threadId);
//});

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

require('./routes/login.js')(app);
require('./routes/profile.js')(app);
require('./routes/register.js')(app);
require('./routes/search.js')(app);
require('./routes/adventures.js')(app);
require('./routes/adventureForm.js')(app);
require('./routes/adventure.js')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

