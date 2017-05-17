var express = require('express');

var router = express.Router();

module.exports= router;

router.get('/',function (req,res) {

    //在渲染之前调用M，将M的数据放在对象里
    res.render('teachers/index',{});
})
router.get('/add',function (req,res) {
    res.render('teachers/add');
})