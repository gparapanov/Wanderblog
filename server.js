var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//Body-parser
var bodyParser = require('body-parser');

//cookies
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var app = express();
var db = require('./db.js');

//favicon
var favicon = require('serve-favicon');
app.use(bodyParser.urlencoded({extended: true}));
//cookies
app.use(cookieParser());
app.use(multer());
app.use(session({
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 6000*300},
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    secret: 'uwotm8'
}));

var sess;

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

require('./routes/login.js')(app,db);
require('./routes/profile.js')(app,db);
require('./routes/register.js')(app,db);
require('./routes/search.js')(app,db);
require('./routes/adventures.js')(app,db);
require('./routes/adventureForm.js')(app,db);
require('./routes/adventure.js')(app,db);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

