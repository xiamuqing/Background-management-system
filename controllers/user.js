var express = require('express');

//路由
var router = express.Router();

//暴露模块
module.exports = router;

router.get('/',function (req,res) {
    res.render('users/index',{});
})

router.get('/profile',function (req,res) {
    res.render('users/profile',{});
})