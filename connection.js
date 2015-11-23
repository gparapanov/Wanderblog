/**
 * Created by Ponczek on 23/11/2015.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    //Here put credentials for your local sql.
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wanderblog'
});

module.exports = connection;