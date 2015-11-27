var db = require('../server.js');
var connection = db();
module.exports = function (app) {
    app.get('/adventure/:id', function (req, res) {
        //app.get('adventures/:id', function( req, res){
        //...This will allow us to load a page wanderblog.bla/adventures/1 <- this will show a post with id 1.
        var adventureid=req.params.id;
        var queryString="SELECT * FROM adventure where id="+adventureid;
        var resultsFunc = function () {
            connection.query(queryString, function (err, rows) {
                if (err) throw err;
                console.log(rows[0].title);
                res.render('adventure', {title: rows[0].title,content: rows[0].content_text,location: rows[0].location,user_id: rows[0].user_id,post_date:rows[0].post_date});
            });
        }
        resultsFunc();

        //in jade you call variable fancy title this way - > #{fancyTitle}
    });
    // we will need this here

};