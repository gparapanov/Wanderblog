var db = require('../server.js');
var connection = db();
var bodyParser = require('body-parser');
module.exports = function (app) {
    app.get('/profile', function (req, res) {
        res.render('profile.jade');
    });


    //A better way of finding the number of adventures must be implemented (asynchronus // callbacks?)
    app.get('/profile/:id', function (req, res) {
        var id = req.params.id;
        var idString = String(id)
        console.log(idString);
        var adventures = [];
        var sqlQuery = 'SELECT * FROM users WHERE id =? LIMIT 1';
        'SELECT title,country FROM adventure where user_id=?';
        connection.query("SELECT * FROM users WHERE id =? LIMIT 1", idString, function (err, rows) {
            //Calculating the number of adventures
            if (rows.length != 0) {
                var adventures = [rows.length];
                for (adv in adventures) {
                    adventures.push(rows.title);
                }
                var userID = rows[0].id;
                res.render('profile.jade', {
                    //user credentials
                    type: rows[0].type,
                    name: rows[0].name,
                    login_name: rows[0].login_name,
                    email: rows[0].email,
                    description: rows[0].description,
                    country: rows[0].country,
                    avatar: rows[0].avatar,
                    //user posts
                    adventures: adventures,
                    title: 'Profile',
                    year: new Date().getFullYear(),
                    message: 'Profile page'

                });
                adventures = [];
                connection.end();
            }
            else {
                //if user doesnt exist redirect
                res.redirect('/login');
            }
        })


    });
}
