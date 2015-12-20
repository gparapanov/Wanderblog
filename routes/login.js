var bcrypt = require('bcryptjs');
//var db = require('../server.js');
var stringify = require('json-stringify-safe');


module.exports = function (app, db) {
    //Login
    app.get('/login', function (req, res) {
        if (req.session.user) {
            res.redirect('/adventures');
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
                        if(bcrypt.compareSync(loginData.password, rows[0].password) || loginData.password==rows[0].password){
                            req.session.isLoggedIn = rows[0].id;
                            req.session.login_name = rows[0].login_name;
                            req.session.type = rows[0].type;
                            res.redirect('/adventures');
                        }else{
                            res.redirect('back');
                        }
                    }else{
                        res.redirect('back');
                    }

                });
                connection.release();
            });
        }
        else {
            res.redirect('/adventures');
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
