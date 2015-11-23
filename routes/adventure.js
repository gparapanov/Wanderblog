module.exports = function (app) {
    app.get('/adventure', function (req, res) {
        res.render('adventure', { title: 'Adventure Page', year: new Date().getFullYear(), message: 'Adventures Page' });
    });
};