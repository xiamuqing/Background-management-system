//处理teacher数据库的数据

var db = require('../config/db');

//通过db处理数据
exports.add = function (body,callback) {
    //body是前台数据 {tc_name: '',tc_pass:''}

    //插入数据
    db.query('INSERT INTO `teacher` SET ?',body,callback);
}

//查询数据
exports.show = function (callback) {
    db.query('SELECT * FROM `teacher` ',callback);
}

//搜索讲师
// exports.search = function (tc_name,callback) {
//     db.query('SELECT * FROM `teacher` WHERE tc_name =' + tc_name,callback);
// }