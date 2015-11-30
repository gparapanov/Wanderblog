module.exports = function (app, db) {
    app.get('/adventure/:id', function (req, res) {
        //app.get('adventures/:id', function( req, res){
        //...This will allow us to load a page wanderblog.bla/adventures/1 <- this will show a post with id 1.

        //uncomment if and else statements to use session
        //if (req.session.isLoggedIn) {
            var adventureid = req.params.id;
            var title, content, location, user_name, post_date;
            var queryString = "SELECT * FROM adventure,users where adventure.user_id=users.id and adventure.id= " + adventureid;
            var resultsFunc = function () {
                db.getConnection(function (err, connection) {
                    connection.query(queryString, function (err, rows) {
                        if (err) throw err;
                        var queryString1 = "select * from comment,users where comment.user_id=users.id and adventure_id=" + adventureid;
                        connection.query(queryString1, function (err1, rows1) {
                            if (err1) throw err1;
                            console.log(rows[0].title);
                            title = rows[0].title;
                            content = rows[0].content_text;
                            location = rows[0].location;
                            user_name = rows[0].login_name;
                            post_date = rows[0].post_date;

                            var comments = [];
                            for (i = 0; i < rows1.length; i++) {
                                var adv = {
                                    post_date: rows1[i].post_date,
                                    content: rows1[i].content,
                                    login_name: rows1[i].login_name,
                                };
                                comments.push((adv));
                            }

                            res.render('adventure', {
                                title: title,
                                content: content,
                                location: location,
                                user_name: user_name,
                                post_date: post_date,
                                comments: comments,
                                isLoggedIn: req.session.isLoggedIn
                            });

                            connection.release();
                        });


                    });
                });

                //res.render('adventure', {title: title1,content: content,location: location,user_name: user_name,post_date:post_date});
            }
            resultsFunc();
        //}
        //else{
            // add message that you need to be signed in to see this page
           // res.redirect('/')
        //}
        //console.log(location);
        //in jade you call variable fancy title this way - > #{fancyTitle}
    });
    // we will need this here

};