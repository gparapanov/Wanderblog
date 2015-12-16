var bcrypt = require('bcryptjs');
//var db = require('../server.js');
var stringify = require('json-stringify-safe');


module.exports = function (app, db) {
    //Login
    app.get('/login', function (req, res) {
        if (req.session.user) {
            res.redirect('/profile');
        }
        else {
            res.render('login.jade');
        }
    });

    app.post('/login', function (req, res) {
        if (!req.session.user) {
            var loginData = {
                login_name: req.body.login_name,
                password: req.body.password
            };

            var user = req.session;
            //req.session.isLoggedIn = "Logged in";
            db.getConnection(function (err, connection) {
                connection.query("SELECT * from users WHERE login_name=? LIMIT 1", [loginData.login_name], function (err, rows) {
                    //catch connection error
                    if (err) {
                        console.error("Error connecting: " + err.stack);
                        return;
                    }

                    //var user = req.session;
                    if (rows.length != 0) {
                        req.session.isLoggedIn = rows[0].id;
                        req.session.login_name = rows[0].login_name;
                        req.session.type = rows[0].type;
                        if (bcrypt.compareSync(loginData.password, rows[0].password)) {
                            user.type = rows[0].type;
                            user.name = rows[0].name;
                            user.login_name = rows[0].login_name;
                            user.email = rows[0].email;
                            user.description = rows[0].description;
                            user.country = rows[0].country;
                            user.avatar = rows[0].avatar;
                            user.id = rows[0].id;

                            //res.send(user);
                            //req.session.user = JSON.parse(stringify(user));
                            res.render('profile.jade', {
                                type: user.type,
                                name: user.name,
                                login_name: user.login_name,
                                email: user.email,
                                description: user.description,
                                country: user.country,
                                avatar: user.avatar,
                                title: 'Login',
                                year: new Date().getFullYear(),
                                message: 'Your login page',
                                //to be replaced with user object
                                isLoggedIn: req.session.isLoggedIn
                            });
                            //res.session.user = user;
                            console.log(user);
                        } else {
                            res.render('login.jade', {error: ' Invalid username or password.'});
                        }
                    } else {
                        res.render('login.jade', {error: ' Invalid username or password.'});
                    }
                    connection.release();
                });
            });
        }
        else {
            res.redirect('/profile');
        }
    });

    app.use('/logout', function (req, res) {
        console.log(req.session.isLoggedIn);
        console.log(req.session.login_name);
        console.log(req.session.type);
        req.session.isLoggedIn = null;
        req.session.login_name = null;
        req.session.type = null;
        //res.session.isLoggedIn = 'POTATO';
        res.header('Cache-Control', 'no-cache');
        res.redirect('/');

    });
}