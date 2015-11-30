var bcrypt = require('bcryptjs');

module.exports = function (app,db){
    app.post('/register', function (req, res) {
        //res.json(req.body);
        //res.render('register.jade');
        if(!req.session.isLoggedIn) {
            var password_hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            var date = new Date();
            date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
            var user = {
                name: req.body.name,
                login_name: req.body.login_name,
                email: req.body.email,
                registered_on: date,
                password: password_hash,
                country: req.body.country,
                type: req.body.type
            };
            db.getConnection(function (err, connection) {
                connection.query('insert into users set ?', user, function (err, result) {
                    //catch mysql connection error
                    if (err) {
                        console.error(err);
                        return;
                    }
                    connection.release();
                });
            });

            res.render('profile', {
                type: user.type,
                name: user.name,
                login_name: user.login_name,
                email: user.email,
                country: user.country,
                title: 'Profile',
                message: 'Your profile page',
                isLoggedIn: req.session.isLoggedIn
            });
        }
        else{
            res.redirect('/profile');
        }
    });

    app.post('register', function (req, res) {
        res.send(req.body.optradio);
    });
    app.post('/register/username_validation',function(req,res){
        var username = req.body.login_name;
        db.getConnection(function(err,connection){
            connection.query("SELECT id FROM users where login_name=?",[username],function(err,rows){
                if(err){
                    return;
                }
                if(rows.length != 0){
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ available: false }));
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({ available: true }));
                }
                connection.release();
            });
        });
    });

    app.get('/register', function (req, res) {
        res.render('register.jade');
    });
}