module.exports = function (app) {
    app.get('/adventureForm', function (req, res) {
        res.render('adventureForm.jade');
    });
}
