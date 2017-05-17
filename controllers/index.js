var express = require('express');

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
    res.render('dashboard/settings',{})
})

//修改密码
router.get('/repass',function (req,res) {
    res.render('dashboard/repass',{})
})
