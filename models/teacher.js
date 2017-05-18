//处理teacher数据库的数据

var db = require('../config/db');

//通过db处理数据
exports.add = function (body,callback) {
    //body是前台数据 {tc_name: '',tc_pass:''}

    //插入数据
    db.query('INSERT INTO `teacher` SET ?',body,callback);
}
exports.edit = function (body,callback) {
    var tc_id = body.tc_id;
    delete tc_id;
    var query = 'UPDATE `teacher` SET ? WHERE `tc_id` ='+ tc_id;

    db.query(query,body,callback);
}

//查询所有数据
exports.show = function (callback) {
    db.query('SELECT * FROM `teacher` ',callback);
}

//查询当数据
exports.find = function (tc_id,callback) {
    db.query('SELECT * FROM `teacher` WHERE tc_id = '+tc_id,callback);
}

//搜索讲师
// exports.search = function (tc_name,callback) {
//     db.query('SELECT * FROM `teacher` WHERE tc_name =' + tc_name,callback);
// }

