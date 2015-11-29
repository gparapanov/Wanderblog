/**
 * Created by Georgi on 29.11.2015 ã..
 */
module.exports = function (app,db) {
    app.get('/comment', function (req, res) {
        res.render('comment.jade');
    });
};