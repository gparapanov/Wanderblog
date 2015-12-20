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
            connection.query("SELECT adventure_id,title, avg(score) as total from rating,adventure where adventure_id=adventure.id group by adventure_id,title order by avg(score) DESC;", function (err, rows) {
                //catch connection error
                if (err) {
                    console.error("Error connecting: " + err.stack);
                    return;
                }
                var top = [];
                for (i = 0; i < 5; i++) {
                    var adv = {
                        adv_id: rows[i].adventure_id,
                        adv_score: rows[i].total,
                        adv_title: rows[i].title
                    };
                    top.push(adv);
                }


                connection.release();
                console.log(top);
                res.render('index.jade', {topAdventures: top, isLoggedIn: req.session.isLoggedIn});
                //console.log(top);
            });
        });
    });
}


