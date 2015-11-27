var bcrypt = require('bcryptjs');

module.exports = function (app,db){
    app.post('/register', function (req, res) {
        //res.json(req.body);
        //res.render('register.jade');
        var password_hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        var date = new Date();
        date = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds();
        var user = {
            name: req.body.name,
            login_name: req.body.login_name,
            email: req.body.email,
            registered_on: date,
            password: password_hash,
            country: req.body.country,
            type: req.body.type
        };
        db.getConnection(function(err,connection){
            connection.query('insert into users set ?', user, function (err, result) {
                //catch mysql connection error
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });

        res.render('profile', {
            type: user.type,
            name: user.name,
            login_name: user.login_name,
            email: user.email,
            country: user.country,
            title: 'Profile',
            message: 'Your profile page'
        });
    });

    app.post('register', function (req, res) {
        res.send(req.body.optradio);
    });

    app.get('/register', function (req, res) {
        res.render('register.jade');
    });
}