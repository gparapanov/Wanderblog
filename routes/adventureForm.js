var db = require('../server.js');
var connection = db();
module.exports = function (app) {
    app.get('/adventureForm', function (req, res) {
        res.render('newPost.jade');
    });

    app.post('/adventureForm', function (req, res) {
        //res.json(req.body);
        //res.render('register.jade');
        var dateNow=new Date().toISOString().slice(0, 19).replace('T', ' ');
        var adventure = {
            id:17,
            title: req.body.textinput,
            location:"Somalia",
            content_text: req.body.adventureContent,
            visit_date: "2014-02-21",
            post_date: dateNow,
            user_id: 10

        };

        connection.query('insert into adventure set ?', adventure, function (err, result) {
            //catch mysql connection error
            if (err) {
                console.error(err);
                return;
            }
        });
        res.redirect('/');
    });




}
