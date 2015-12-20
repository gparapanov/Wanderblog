module.exports = function (app, db) {
    //Login
    app.get('/about', function (req, res) {
        res.render('about.jade',{ isLoggedIn: req.session.isLoggedIn});
    });
};
