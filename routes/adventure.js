var db = require('../server.js');
var connection = db();
module.exports = function (app) {
    app.get('/adventure', function (req, res) {
        //app.get('adventures/:id', function( req, res){
        //...This will allow us to load a page wanderblog.bla/adventures/1 <- this will show a post with id 1.
        var adventureid=1;//req.params.id
        var results=[];
        var queryString="SELECT * FROM adventure";
        var resultsFunc = function () {
            connection.query(queryString, function (err, rows, fields) {
                if (err) throw err;
                for ( i = 0; i<rows.length; i ++){
                    if (rows.length != 0){

                        if(rows[i].id==adventureid){
                            results.push(rows[i].id);
                            results.push(rows[i].title);
                            results.push(rows[i].location);
                            results.push(rows[i].content_text);
                            results.push(rows[i].visit_date);
                            results.push(rows[i].post_date);
                            results.push(rows[i].user_id);
                        }

                    }
                }
                return results;
            });
        }
        var fieldsLoaded = resultsFunc();
        res.render('adventure', { loadRes: fieldsLoaded });
        //in jade you call variable fancy title this way - > #{fancyTitle}
    });
    // we will need this here

};