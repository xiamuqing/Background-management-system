var express = require('express');

//引入讲师数据模型
var tcModel = require('../models/teacher');

var router = express.Router();

module.exports= router;

router.get('/',function (req,res) {

    //在渲染之前调用M，将M的数据放在对象里
    res.render('teachers/index',{});
})
router.get('/add',function (req,res) {
    res.render('teachers/add');
})

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