module.exports = function (app,db) {
    app.get('/adventure/:id', function (req, res) {
        //app.get('adventures/:id', function( req, res){
        //...This will allow us to load a page wanderblog.bla/adventures/1 <- this will show a post with id 1.
        var adventureid=req.params.id;
        var title,content,location,user_name,post_date;
        var queryString="SELECT * FROM adventure,users where adventure.user_id=users.id and adventure.id= "+adventureid;
        var resultsFunc = function () {
            db.getConnection(function(err,connection){
                connection.query(queryString, function (err, rows) {
                    if (err) throw err;
                    console.log(rows[0].title);
                    title=rows[0].title;
                    content=rows[0].content_text;
                    location=rows[0].location;
                    user_name=rows[0].login_name;
                    post_date=rows[0].post_date;
                    //select * from comment,users where adventure_id=1 and comment.user_id=users.id;
                    res.render('adventure', {title: title,content: content,location: location,user_name: user_name,post_date:post_date});
                    connection.release();
                });
            });

            //res.render('adventure', {title: title1,content: content,location: location,user_name: user_name,post_date:post_date});
        }
        resultsFunc();
        //console.log(location);
        //in jade you call variable fancy title this way - > #{fancyTitle}
    });
    // we will need this here

};