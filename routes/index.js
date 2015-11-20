
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

//exports.adventures = function (req, res) {
//    var posts = [];
//    console.log("potato");
//    var query = connection.query("SELECT * from posts", function (err, rows, fields) {
//        for(i = 0; i <rows.length; i++) {
//            posts.push({
//                id: rows[i].id,
//                title: rows[i].title,
//                location: rows[i].location,
//                visit_date: rows[i].visit_date,
//                post_date: rows[i].post_date,
//                user_id: rows[i].user_id
//            });
//        }
//    });
//    console.log(posts);
//    res.render('adventures.jade');
//};

exports.adventure = function (req, res) {
    res.render('adventure', { title: 'Adventure Page', year: new Date().getFullYear(), message: 'Adventures Page' });
};