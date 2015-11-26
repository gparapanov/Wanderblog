var bcrypt = require('bcryptjs');
var db = require('../server.js');
var connection = db();

module.exports = function(app){
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
                    user.id =rows[0].id;


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

}