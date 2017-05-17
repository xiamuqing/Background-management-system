//处理teacher数据库的数据

var db = require('../config/db');

//通过db处理数据
exports.add = function (body,callback) {
    //body是前台数据 {tc_name: '',tc_pass:''}

    //插入数据
    db.query('INSERT INTO `teacher` SET ?',body,callback);
}