module.exports = function (app, db) {
    var adventureid;
    app.get('/adventure/:id', function (req, res) {
            adventureid = req.params.id;
            var title, content, location, user_name, post_date,user_id;
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
                            user_id=rows[0].user_id;
                            var separatorIndex=location.indexOf("!");
                            var locationLat=location.substring(0,separatorIndex);
                            var locationLon=location.substring(separatorIndex+1);
                            var comments = [];
                            for (i = 0; i < rows1.length; i++) {
                                var adv = {
                                    post_date: rows1[i].post_date,
                                    content: rows1[i].content,
                                    login_name: rows1[i].login_name
                                };
                                comments.push((adv));
                                console.log(comments);
                            }
                            var tagsString="select name from adventure_tag,tag where adventure_tag.tag_id=tag.id and adventure_tag.adventure_id=";
                            var tags="";
                            connection.query(tagsString+adventureid, function (err, rows) {
                                if (err) throw err;
                                for(var i=0;i<rows.length;i++) {
                                    tags = tags.concat("#" + rows[i].name);
                                }
                                console.log(tags);
                                var scoreString="select avg(score) as score from rating where adventure_id=";
                                connection.query(scoreString+adventureid, function (err, rows) {
                                    if (err) throw err;
                                    var advRating="";
                                    var leadText=content.split(".");
                                    var rand1=Math.floor((Math.random() * 4) + 1);
                                    var leadDisplay=[];
                                    for(var i=rand1;i<rand1+3;i++){
                                        leadDisplay.push('"'+leadText[i]+'"');
                                    }
                                    //console.log(rows[0].score);
                                    advRating=advRating.concat(rows[0].score);
                                    res.render('adventure', {
                                        title: title,
                                        content: content,
                                        tags:tags,
                                        location: location,
                                        user_name: user_name,
                                        user_id:user_id,
                                        post_date: post_date,
                                        comments: comments,
                                        ratings: advRating,
                                        leadDisplay:leadDisplay,
                                        //locationLat:locationLat,
                                        //locationLon:locationLon,
                                        isLoggedIn: req.session.isLoggedIn,
                                        login_name: req.session.login_name,
                                        type: req.session.type
                                    });
                                });
                            });
                            //console.log(advRating);
                            connection.release();
                        });
                    });
                });
            }
            resultsFunc();
    });
    app.post('/adventure/:id', function (req, res) {
        if(req.session.isLoggedIn && (req.session.type === "Author" || req.session.type ==="Admin")) {
            var comment = req.body.commText;
            var dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
            var adventureid = req.params.id;
            var commQuery = {
                post_date: dateNow,
                content: comment,
                user_id: req.session.isLoggedIn,//later get this from the session
                adventure_id: adventureid
            };
            db.getConnection(function (err, connection) {
                connection.query('insert into comment set ?', commQuery, function (err, result) {
                    //catch mysql connection error
                    if (err) {
                        console.error(err);
                        return;
                    }
                    connection.release();
                });
                res.redirect('back');
            });
        }
    });
    app.post('/ratings', function (req, res) {
        if(req.session.isLoggedIn) {
            var score = req.body.rating;
            //console.log(window.location.href );
            var rateValue = {
                adventure_id: adventureid,
                user_id: req.session.isLoggedIn,
                score: req.body.rating
            };

            db.getConnection(function (err, connection) {
                connection.query('insert into rating set ?', rateValue, function (err, result) {
                    //catch mysql connection error
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log("bbb");
                    connection.release();
                });
                res.redirect('back');
            });
        }
    });
};