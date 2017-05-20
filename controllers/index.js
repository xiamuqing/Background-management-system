var express = require('express');

var tcModal = require('../models/teacher');

//省市县数据
var region = require('../models/region.json');

//路由
var router = express.Router();

//暴露模块
module.exports = router;


//首页
router.get('/',function (req,res) {
    // res.send('hello nodejs');
    res.render('dashboard/index');
});

//个人设置
router.get('/settings',function(req,res){
    //根据用户登录信息再次查询结果
    var tc_id = req.session.loginfo.tc_id;
    tcModal.find(tc_id,function (err,result) {
       if(err) return;
        res.render('dashboard/settings',result[0]);
    });
})

//修改密码
router.get('/repass',function (req,res) {
    res.render('dashboard/repass',{})
})

router.get('/region',function (req,res) {
    res.json(region);
})
