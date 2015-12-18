/*
 * GET home page.
 */

//exports.index = function (req, res) {
//    res.render('index', { title: 'Wanderblog', year: new Date().getFullYear(), isLoggedIn : req.session.isLoggedIn});
//
//};

module.exports = function (app, db) {
    //Login
    app.get('/', function (req, res) {
        db.getConnection(function (err, connection) {
            connection.query("SELECT adventure_id, SUM(score) as total from rating group by adventure_id order by sum(score) DESC;", function (err, rows) {
                //catch connection error
                if (err) {
                    console.error("Error connecting: " + err.stack);
                    return;
                }
                var top = [];
                for (i = 0; i < 5; i++) {
                    var adv = {
                        adv_id: rows[i].adventure_id,
                        adv_score: rows[i].total
                    };
                    top.push(adv);

                }
                console.log(top);
                connection.release();
                res.render('index.jade', {topAdventures: top, isLoggedIn: req.session.isLoggedIn});
            });
        });


    });
}


