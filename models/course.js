var db = require('../config/db');

exports.add = function (body,callback) {
    var query = 'INSERT INTO `course` SET ?';

    db.query(query,body,callback);
}

//查询数据
exports.find = function (cs_id,callback) {
    db.query('SELECT * FROM `course` WHERE cs_id = '+cs_id,callback);
}

exports.update = function (body,callback) {
    var cs_id = body.cs_id;
    delete body.cs_id;
    db.query('UPDATE  `course` SET ? WHERE cs_id = '+cs_id,body,callback);
}
