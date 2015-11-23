var db = require('../server.js');
var connection = db();

module.exports = function(app){
    app.get('/adventures', function (req, res) {
        // Description of adventure needs to be added,
        // query for amount of comments
        // pictures/avatar
        connection.query("SELECT u.login_name, u.avatar, u.id, a.visit_date, a.title, a.location, a.user_id FROM users as u INNER JOIN adventure AS a ON u.id = a.user_id", function (err, rows) {
            //catch connection error
            if (err) {
                console.error("Error connecting: " + err.stack);
                return;
            }
            var adventures = [];
            for (i = 0; i < rows.length; i++) {
                var adv = {
                    title: rows[i].title,
                    login_name: rows[i].login_name,
                    avatar: rows[i].avatar,
                    location: rows[i].location,
                    visit_date: rows[i].visit_date,
                    post_date: rows[i].post_date,
                    user_id: rows[i].user_id
                };
                adventures.push(adv);
            }
            res.render('adventures', {adventures: adventures});
        });

    });
}