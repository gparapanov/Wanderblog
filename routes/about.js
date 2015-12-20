module.exports = function (app, db) {
    //Login
    app.get('/about', function (req, res) {
        res.render('about',
                    {isLoggedIn: req.session.isLoggedIn,
                    type: req.session.type});
    });
};
