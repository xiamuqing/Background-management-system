var express = require('express');

//引入讲师数据模型
var tcModel = require('../models/teacher');

var router = express.Router();

module.exports= router;

//展示teacher
router.get('/',function (req,res) {

    //在渲染之前调用M，将M的数据放在对象里
    //调用model
    tcModel.show(function (err,result) {
        if(err) return;
        res.render('teachers/index',{teachers:result});
    });
})
router.get('/add',function (req,res) {
    res.render('teachers/add',{});
})

//添加讲师
router.post('/add',function (req,res) {
    //post数据
    console.log(req.body);
    var body = req.body;
    //调用model进行数据处理
    tcModel.add(body,function (err,result) {
        if(err) return ;
        //成功后返回前台一个json
        res.json({
            code:200,
            msg:'添加成功',
            result:{}
        });
    });

})

//编辑 :表示参数
router.get('/edit/:tc_id',function (req,res) {
    var tc_id = req.params.tc_id;

    //调用模型查询讲师信息
    tcModel.find(tc_id,function (err,result) {
        if(err) return;
        // console.log(result);
        res.render('teachers/add',{teacher:result[0]});
    });
})

//编辑
router.post('/edit',function (req,res) {
    //post数据
    console.log(req.body);
    var body = req.body;
    //调用数据 更新至数据库
    tcModel.edit(body,function (err,result) {
        if(err) return ;
        //成功后返回前台一个json
        res.json({
            code:200,
            msg:'修改成功',
            result:{}
        });
    });

})
//搜索讲师
router.post('/search',function (req,res) {
    var tc_name =  req.body.tc_name;
    console.log(tc_name);
    tcModel.search(tc_name,function (err,result) {
        if(err) return;
        res.json({
            result:result
        });
    });
})

//注销讲师
router.post('/state',function (req,res) {
    var tcid = req.body.tc_id;
    tcModel.status(tcid,function (err,result) {
        if(err) return;
        res.json({
            code:200,
        })
    })
})

//查看讲师信息（模态框）
router.post('/preview',function (req,res) {
    //接收前端传来的讲师ID
    //console.log(req.body)
    var tc_id = req.body.tc_id;
    tcModel.find(tc_id,function (err,result) {
        if(err) return;
       // console.log(result);
        res.json(result[0]);
    })
})