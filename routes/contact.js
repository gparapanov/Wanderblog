module.exports = function (app, db) {
    //Login
    app.get('/contact', function (req, res) {
        res.render('contact.jade');
    });
};