var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'us-cdbr-azure-central-a.cloudapp.net',
    user: 'bc103542111d8a',
    password: '5de22dac',
    database: 'acsm_e6b305d56de31f5'
});

exports.getConnection = function(callback){
    pool.getConnection(function(err, connection){
        callback(err,connection);
    });
};
