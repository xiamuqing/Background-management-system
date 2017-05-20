var express = require('express');

var router = express.Router();

//讲师表
var tcModel = require('../models/teacher');

module.exports= router;

router.get('/',function (req,res) {
    res.render('login/login',{});
})

router.post('/',function (req,res) {
    var body = req.body;
    tcModel.authored(body,function (err,result) {
        if(err) console.log(err);

        //记录登录状态
        req.session.loginfo = result[0];
        res.json({
            code:200,
            msg:'登录成功！',
            result:{}
        });
    })
})