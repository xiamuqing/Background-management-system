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
    res.render('teachers/add');
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
            ressult:{}
        });
    });

})

//搜索讲师
// router.post('/search',function (req,res) {
//     var body = req.body.tc_name;
//     console.log(body);
//     tcModel.search(body,function (err,result) {
//         if(err) return;
//         res.render('teachers/index',{teachers:result});
//     });
// })