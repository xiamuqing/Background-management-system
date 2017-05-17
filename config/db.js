
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port     : '3307',
    password : '585858',
    database : 'project'
});

module.exports = connection;