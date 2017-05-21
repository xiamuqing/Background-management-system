var db = require('../config/db');

exports.add = function (body,callback) {
  //  console.log(body);
    var query = 'INSERT INTO `category` SET ?';
    db.query(query,body,callback);
}

exports.show = function (callback) {
    var query = 'SELECT * FROM `category` WHERE `cg_pid` = 0';
    db.query(query,callback);
}
exports.list = function (callback) {
    var query = 'SELECT * FROM  `category`';
    db.query(query,callback);
}