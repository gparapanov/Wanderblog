var db = require('../server.js');
var connection = db();

module.exports = function(app) {
    app.post('/search', function (req, res) {
        var searched = req.body.searchedFor;
        var searchedFilter = req.body.search_filter_options;

        var query = 'SELECT title, uploaded, location, uploader, AVG(r.score) AS averageScore FROM (SELECT a.id AS adventure_id, a.title, a.post_date AS uploaded, a.location, u.login_name AS uploader, u.name FROM adventure AS a INNER JOIN users AS u ON a.user_id = u.id) a_u INNER JOIN rating AS r ON a_u.adventure_id = r.adventure_id';
        if (searched && searchedFilter) {
            if (searchedFilter == 'date') {
                query += ' GROUP BY a_u.adventure_id HAVING uploaded ' + req.body.date;
                query += req.body.beforeafter == 'before' ? '< ' : '> ';
                query += req.body.date;
            } else if (searchedFilter == 'rating') {
                query += ' GROUP BY a_u.adventure_id HAVING averageScore > ' + req.body.rating;
            } else if (searchedFilter == 'author') {
                query += ' GROUP BY a_u.adventure_id HAVING a_u.name LIKE "%' + req.body.user_name + '%"';
            } else if (searchedFilter == 'keywords') {
                var keywords = req.body.keywords.split(",");
                query += '';
                query += ' WHERE t.name LIKE "%' + keywords.join('%" OR t.name LIKE "%') + '%"';
            }
            query += ' AND title LIKE "%' + searched + '%";';
            console.log(query);
        }

        connection.query('SELECT * from adventure WHERE title LIKE ?', '%' + [searched] + '%', function (err, rows) {
            if (err) {
                console.log(err.stack);
                res.render('index.jade');
                return;
            }
            if (rows.length <= 0) {
                res.render('search.jade', {
                    noticeresults: 'Nothing found for your search term, please try again',
                    searchedFor: searched
                });
            } else {
                res.render('search.jade', {
                    noticeresults: 'Following adventures found!',
                    searchResult: rows,
                    searchedFor: searched
                });
            }
        });
    });
}