var db = require('../server.js');
var connection = db();
module.exports = function (app) {
    app.get('/adventure', function (req, res) {
        res.render('adventure', { title: 'Adventure Page', year: new Date().getFullYear(), message: 'Adventures Page' });
    });
    var count=0;
    var queryString="SELECT * FROM adventure";
    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        count++;
        for (var i in rows) {
            console.log('Post Titles: ', rows[i].title);
            if(count<2){
                $(".adventure-title").val(rows[i].title);
                break;
            }
        }
    });
};