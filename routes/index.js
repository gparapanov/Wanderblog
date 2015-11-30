
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Wanderblog', year: new Date().getFullYear(), isLoggedIn : req.session.isLoggedIn});
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page',isLoggedIn : req.session.isLoggedIn });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page',isLoggedIn : req.session.isLoggedIn });
};

