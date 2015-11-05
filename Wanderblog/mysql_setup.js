var mysql = require('mysql');
var connection = mysql.createConnection({
    //Here put credentials for your local sql.
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'wanderblog'
});

connection.connect();

var queryString = 'SELECT * FROM w_user';

connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;

    for (var i in rows) {
        console.log('Name: ', rows[i].name);
    }
});

connection.end();