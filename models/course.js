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

exports.list = function (callback) {
    //连表查询
    var query = 'SELECT * FROM `course` AS cs LEFT JOIN `teacher` AS tc ON cs.cs_tc_id= tc.tc_id LEFT JOIN `category` AS cg ON cs.cs_cg_id= cg.cg_id';

    db.query(query,callback);
}
//查询讲师的课程
exports.tccourse = function (tc_id,callback) {
    //连表查询
    var query = 'SELECT * FROM `course` AS cs LEFT JOIN `teacher` AS tc ON cs.cs_tc_id= tc.tc_id LEFT JOIN `category` AS cg ON cs.cs_cg_id= cg.cg_id WHERE cs_tc_id ='+ tc_id;

    db.query(query,callback);
}

//管理员搜索课程
exports.search = function (cs_name,callback) {
    var query = "SELECT * FROM `course` AS cs LEFT JOIN `teacher` AS tc ON cs.cs_tc_id= tc.tc_id LEFT JOIN `category` AS cg ON cs.cs_cg_id= cg.cg_id WHERE cs_name LIKE '%"+cs_name+"%'";

    db.query(query,callback);
}

//讲师搜索课程
exports.tcsearch = function (tc_id,cs_name,callback) {
    var query = "SELECT * FROM `course` AS cs LEFT JOIN `teacher` AS tc ON cs.cs_tc_id= tc.tc_id LEFT JOIN `category` AS cg ON cs.cs_cg_id= cg.cg_id WHERE cs_tc_id ="+ tc_id +"  AND cs_name LIKE '%"+cs_name+"%'";

    db.query(query,callback);
}
