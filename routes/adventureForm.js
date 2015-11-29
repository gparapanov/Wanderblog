
module.exports = function (app,db) {
    app.get('/adventureForm', function (req, res) {
        res.render('adventureForm.jade');
    });

    app.post('/adventureForm', function (req, res) {
        //res.json(req.body);
        //res.render('register.jade');
        var dateNow=new Date().toISOString().slice(0, 19).replace('T', ' ');
        var adventure = {
            title: req.body.textinput+"",
            location:req.body.adventureLocation+"",
            content_text: req.body.adventureContent+"",
            visit_date: '2014-02-21',
            post_date: dateNow,
            user_id: 10

        };
        db.getConnection(function(err,connection){
            connection.query('insert into adventure set ?', adventure, function (err, result) {
                //catch mysql connection error
                if (err) {
                    console.error(err);
                    return;
                }
                connection.release();
            });
            res.redirect('/');
        });

    });




}
