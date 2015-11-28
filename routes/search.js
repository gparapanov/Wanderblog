module.exports = function(app,db) {
    app.post('/search', function (req, res) {
        var searched = req.body.searchedFor;
        var searchedFilter = req.body.search_filter_options;
        var query = 'select a.id as adventureId, a.title, a.post_date as uploadedOn, a.location, a.content_text, a_tt.tags, u.login_name as uploader, rt.averageScore, cm.numComments from adventure as a left join (select a_t.adventure_id, a_t.tag_id, t.id, GROUP_CONCAT(t.name) as tags from adventure_tag as a_t left join tag as t on a_t.tag_id = t.id group by a_t.adventure_id) as a_tt on a.id = a_tt.adventure_id inner join users as u on a.user_id = u.id left join (select r.adventure_id, avg(r.score) as averageScore from rating as r group by r.adventure_id) as rt on a.id = rt.adventure_id left join (select adventure_id, count(adventure_id) as numComments from comment as c group by c.adventure_id) as cm on a.id = cm.adventure_id ';
        if (searched && searchedFilter) {
            if (searchedFilter == 'date') {
                query += 'HAVING uploadedOn ';
                query += req.body.beforeafter == 'before' ? '< ' : '> ';
                query += req.body.date;
            } else if (searchedFilter == 'rating') {
                query += 'HAVING averageScore > ' + req.body.rating;
            } else if (searchedFilter == 'author') {
                query += 'HAVING uploader LIKE "%' + req.body.user_name + '%"';
            } else if (searchedFilter == 'keywords') {
                var keywords = req.body.keywords.split(",");
                query += 'HAVING tags LIKE "%' + keywords.join('%" OR tags LIKE "%') + '%"';
            }
            query += ' AND title LIKE "%' + searched + '%";';
        }else {
            query += 'HAVING title LIKE "%' + searched + '%";';
        }
        db.getConnection(function(err,connection){
            connection.query(query, function (err, rows) {
                if (err) {
                    console.log(err.stack);
                    res.render('index.jade');
                    return;
                }
                if (rows.length <= 0) {
                    res.render('search',{
                        noticeresults: 'Nothing found for your search term, please try again',
                        searchedFor: searched
                    });
                } else {
                    res.render('search',{
                        noticeresults: 'Following adventures found!',
                        searchResult: rows,
                        searchedFor: searched
                    });
                }
            });
            connection.release();
        });
    });
}