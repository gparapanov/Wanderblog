
module.exports = function (app,db) {
    app.get('/adventureForm', function (req, res) {
        res.render('adventureForm.jade');
    });

    app.post('/adventureForm', function (req, res) {
        //res.json(req.body);
        //res.render('register.jade');
       // if(req.session.isLoggedIn) {
            var dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
            var adventure = {
                title: req.body.textinput + "",
                location: req.body.lat+"!"+req.body.lon,
                content_text: req.body.adventureContent + "",
                visit_date: '2014-02-21',
                post_date: dateNow,
                user_id: 10
                //http://logicify.github.io/jquery-locationpicker-plugin/
            };
            db.getConnection(function (err, connection) {
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
      //  }
      //  else{
            //Add message that user has to be logged in to see this page.
           // res.redirect('/');
        //}
    });




}
