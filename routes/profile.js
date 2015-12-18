var bodyParser = require('body-parser');
function queryRows(col, table) {
    return function(cb) {
        var rows = [];
        db.execute('SELECT ' + col + ' FROM ' + table)
            .on('row', function(r) {
                rows.push(r)
            })
            .on('result', function() {
                cb(rows);
            });
    }
}
module.exports = function (app,db) {
    app.get('/profile', function (req, res) {
        if (req.session.isLoggedIn) {
            res.render('profile.jade', {isLoggedIn: req.session.isLoggedIn});
        }
        else{
            //Display error that you need to be signed in to see this page
            res.redirect('/');
        }
    });


    app.get('/profile/:id', function (req, res) {
        if(req.session.isLoggedIn) {
            var id = req.params.id;
            var idString = String(id)
            console.log(idString);
            var ifHasPosts = "SELECT u.name, u.id, u.description, u.type, u.avatar, u.email, u.login_name, u.country, u.registered_on, a.title, a.id, c.user_id, c.post_date FROM users as u INNER JOIN adventure AS a ON u.id = a.user_id  INNER JOIN comment as c ON u.id = c.user_id WHERE u.id = ?";
            var userCredentials = "SELECT * from users WHERE id = ?;";
            var hasComments = "Select*from comment where user_id = ?;";
            var hasAdventure = "Select*from adventure where user_id = ?;";
            var twoQueries = ifHasPosts + userCredentials;

            db.getConnection(function (err, connection) {
                // Use the connection
                var comments = 0;
                var adventures = [];
                //check amount of comments
                connection.query(hasComments, idString, function (err, rows) {
                    if (rows.length != 0) {
                        for (i = 0; i < rows.length; i++) {
                            //console.log(rows[i].title)
                            if (rows[i].post_date != null) {
                                comments++;
                            }

                        }
                    }
                });
                //check amount of adventures//store them
                connection.query(hasAdventure, idString, function (err, rows) {

                    if (rows.length != 0) {
                        for (i = 0; i < rows.length; i++) {
                            //console.log(rows[i].title)
                            if (rows[i].title != null) {
                                adventures.push({title: rows[i].title, id: rows[i].id});
                            }

                        }
                    }
                });

                connection.query(ifHasPosts, idString, function (err, rows) {
                    if (rows.length != 0) {
                        var membershipDate = rows[0].registered_on;
                        var today = new Date();
                        var oneDay = 24*60*60*1000;
                        var diffDays = Math.round(Math.abs((membershipDate.getTime() - today.getTime())/(oneDay)));


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
                            membership: diffDays,
                            message: 'Profile page',
                            commentsAmount : comments,
                            isLoggedIn: req.session.isLoggedIn
                        });
                    }
                    else {
                        connection.query(userCredentials, idString, function (err, rows) {
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
                                commentsAmount : comments,
                                title: 'Profile',
                                year: diffDays,
                                message: 'Profile page',
                                isLoggedIn: req.session.isLoggedIn
                            });
                        });

                    }
                });connection.release();
            });
        }
        else{
            res.redirect('/');
        }

    });
}
