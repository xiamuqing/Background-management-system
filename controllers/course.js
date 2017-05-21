var express = require('express');
var router = express.Router();

//分类模型
var  cgModel = require('../models/category');
module.exports = router;

var common = require('../utils/common')

router.get('/add',function (req,res) {
    res.render('courses/add')
})

router.get('/list',function (req,res) {
    res.render('courses/list')
})
router.get('/category',function (req,res) {
    //查询所有分类
    cgModel.list(function (err,result) {
        if(err) return;
        var tree = common.getTree(result,0);
        res.render('courses/category',{categorys:tree});
    })
})
router.get('/category/add',function (req,res) {
    //取分类
    cgModel.show(function (err,result) {
        if(err) return;
        res.render('courses/category_add',{categorys:result})
    })
})
router.post('/category/add',function (req,res) {
    cgModel.add(req.body,function (err,result) {
        if(err) return;
        res.json({
            code:200,
            msg:'添加成功',
            result:{}
        })
    });
})
