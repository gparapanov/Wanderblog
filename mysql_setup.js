var mysql = require('mysql');
var connection = mysql.createConnection({
    //Here put credentials for your local sql.
    host: 'us-cdbr-azure-central-a.cloudapp.net',
    user: 'bc103542111d8a',
    password: '5de22dac',
    database: 'acsm_e6b305d56de31f5'
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