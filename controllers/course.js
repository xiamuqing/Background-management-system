var express = require('express');
var router = express.Router();

//分类模型
var cgModel = require('../models/category');
module.exports = router;

//课程模型
var csModel = require('../models/course');

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

//编辑 :表示参数
router.get('/category/edit/:cg_id',function (req,res) {
    var cg_id = req.params.cg_id;

    //调用模型查询讲师信息
    cgModel.find(cg_id,function (err,result) {
        if(err) return;
        //取分类
        cgModel.show(function (err,resultClass) {
            if(err) return;
            res.render('courses/category_add',{category:result[0],categorys:resultClass});
        })
    });

})

//编辑
router.post('/category/edit',function (req,res) {
    //post数据
   // console.log(req.body);
    var body = req.body;
    //调用数据 更新至数据库
    cgModel.edit(body,function (err,result) {
        if(err) return ;
        //成功后返回前台一个json
        res.json({
            code:200,
            msg:'修改成功',
            result:{}
        });
    });

})

router.post('/add',function (req,res) {
    //调用模型添加数据
    csModel.add(req.body,function (err,result) {
        if(err) return;
        res.json({
           code:200,
            msg:'添加成功',
            result:{
                insertId:result.insertId
            }
        });
    })
})

router.get('/basic/:cs_id',function (req,res) {
    res.render('courses/basic');
})
