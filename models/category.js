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
exports.edit = function (body,callback) {
    var cg_id = body.cg_id;
    delete cg_id;
    var query = 'UPDATE `category` SET ? WHERE `cg_id` ='+ cg_id;

    db.query(query,body,callback);
}

//查询数据
exports.find = function (cg_id,callback) {
    db.query('SELECT * FROM `category` WHERE cg_id = '+cg_id,callback);
}

exports.getParent = function (cs_cg_id, callback) {

    var query = 'SELECT * FROM `category` WHERE `cg_pid`=0 UNION SELECT * FROM `category` WHERE `cg_pid`=(SELECT `cg_pid` FROM `category` WHERE `cg_id`=' + cs_cg_id + ')';

    db.query(query, callback);
}
exports.getChild = function (cg_id,callback) {
    var query = 'SELECT * FROM `category` WHERE `cg_pid`='+cg_id;
    db.query(query,callback);
}
