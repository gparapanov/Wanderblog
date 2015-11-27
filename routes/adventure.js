var db = require('../server.js');
var connection = db();
module.exports = function (app) {
    app.get('/adventure/:id', function (req, res) {
        //app.get('adventures/:id', function( req, res){
        //...This will allow us to load a page wanderblog.bla/adventures/1 <- this will show a post with id 1.
        var adventureid=req.params.id;
        var results=[];
        var queryString="SELECT * FROM adventure ;";
        var resultsFunc = function () {
            connection.query(queryString, function (err, rows, fields) {
                if (err) throw err;
                var advInfo = [];
                for (i = 0; i < rows.length; i++) {
                    if(adventureid==rows[i].id){

                        var adv = {
                            title: rows[i].title,
                            content: rows[i].content_text,
                            //login_name: rows[i].login_name,
                            avatar: rows[i].avatar,
                            location: rows[i].location,
                            visit_date: rows[i].visit_date,
                            post_date: rows[i].post_date,
                            user_id: rows[i].user_id
                        };
                        advInfo.push(adv);
                    }

                }
                res.render('adventure', {adventure: advInfo});
            });
        }

        //in jade you call variable fancy title this way - > #{fancyTitle}
    });
    // we will need this here

};