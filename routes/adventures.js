module.exports = function(app,db){
    app.get('/adventures', function (req, res) {


        console.log(req.session.isLoggedIn);

        if(req.session.isLoggedIn) {
            // Description of adventure needs to be added,
            // query for amount of comments
            // pictures/avatar
            db.getConnection(function (err, connection) {
                connection.query("SELECT u.login_name, u.avatar, u.id, a.content_text, a.visit_date, a.title, a.location, a.user_id FROM users as u INNER JOIN adventure AS a ON u.id = a.user_id", function (err, rows) {
                    //catch connection error
                    if (err) {
                        console.error("Error connecting: " + err.stack);
                        return;
                    }
                    var adventures = [];
                    for (i = 0; i < rows.length; i++) {
                        var adv = {
                            title: rows[i].title,
                            content: rows[i].content_text,
                            login_name: rows[i].login_name,
                            avatar: rows[i].avatar,
                            location: rows[i].location,
                            visit_date: rows[i].visit_date,
                            post_date: rows[i].post_date,
                            user_id: rows[i].user_id
                        };
                        adventures.push(adv);
                    }
                    connection.release();
                    res.render('adventures', {adventures: adventures, isLoggedIn: req.session.isLoggedIn});
                });
            });
        }
        else{
            res.header('Cache-Control', 'no-cache');
            res.redirect('/');
        }
    });
}