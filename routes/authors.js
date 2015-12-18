/**
 * Created by Georgi on 19.12.2015 ã..
 */
module.exports = function (app, db) {
    app.get('/authors', function (req, res) {
        db.getConnection(function (err, connection) {
            var authorsQuery="select users.name,users.id,users.login_name,count(adventure.id) from users,adventure where adventure.user_id=users.id GROUP by users.name";
            connection.query(authorsQuery, function (err, rows) {
                if (err) {
                    console.error("Error connecting: " + err.stack);
                    return;
                }
                var authors = [];
                for (i = 0; i < rows.length; i++) {
                    var auth = {
                        auth_id: rows[i].id,
                        name: rows[i].name,
                        login_name: rows[i].login_name,
                        posts: rows[i].posts

                    };
                    authors.push(auth);
                }
                connection.release();
                res.render('authors', {
                    authors: authors,
                    isLoggedIn: req.session.isLoggedIn,
                    login_name: req.session.login_name,
                    type: req.session.type
                });
            });
        });
    });
}
