
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Wanderblog', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page' });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};

exports.login = function (req, res) {
    res.render('login', { title: 'Login', year: new Date().getFullYear(), message: 'Your login page' });
};

exports.register = function (req, res) {
    res.render('register', { title: 'Register', year: new Date().getFullYear(), message: 'Your Register page' });
};

exports.newPost = function (req, res) {
    //res.render('newPost.jade');
    res.render('newPost', { title: 'New Adventure', year: new Date().getFullYear(), message: 'Write an adventure' });
};

exports.profile = function (req, res) {
    res.render('profile', { title: 'User Profile Page', year: new Date().getFullYear(), message: 'Profile Page' });
};

exports.profile = function (req, res) {
    res.render('adventures', { title: 'Adventures Page', year: new Date().getFullYear(), message: 'Profile Page' });
};