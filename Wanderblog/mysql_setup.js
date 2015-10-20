var mysql = require('mysql');
var connection = mysql.createConnection({
    //Here put credentials for your local sql.
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
});

connection.connect();
