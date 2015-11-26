var db = require('../server.js');
var connection = db();
module.exports = function (app) {
    app.get('/adventure', function (req, res) {
        var count=0;
        //thats not what we want to get for a single adventure//

        var queryString="SELECT * FROM adventure";
        var titleFunc = function () {
            connection.query(queryString, function (err, rows, fields) {
                if (err) throw err;
                for ( i = 0; i<rows.length; i ++){
                    if (rows.length != 0){
                        console.log(rows[3].title);
                        return rows[3].title;

                    }
                }
                //count++;
                //for (var i in rows) {
                //    console.log('Post Titles: ', rows[i].title);
                //    if (count < 2) {
                //        //what is this ?
                //        //$(".adventure-title").val(rows[i].title);
                //        break;
                //    }
                //}
            });
        }
        var titleDisplayed = titleFunc();

        // HERE IN RENDER U PASS VARIABLE NAMES
        //after code below executes , this 'class' is done
        // It will pass all the variables in curly brackets to your jade file.
        res.render('adventure', { fancyTitle: titleDisplayed, title: 'Adventure Page', year: new Date().getFullYear(), message: 'Adventures Page' });
        //in jade you call variable fancy title this way - > #{fancyTitle}

    });
    // we will need this here
    //app.get('adventures/:id', function( req, res){
    //...This will allow us to load a page wanderblog.bla/adventures/1 <- this will show a post with id 1.
    //}
};