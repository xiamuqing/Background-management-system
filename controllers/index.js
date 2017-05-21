var express = require('express');

var tcModal = require('../models/teacher');

//省市县数据
var region = require('../models/region.json');

//路由
var router = express.Router();

//暴露模块
module.exports = router;

var path = require('path');
var rootPath = path.join(__dirname,'../')

//express图片上传插件
var multer = require('multer');

// 自定义存储路径
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, rootPath + 'uploads/avatars');
    },
    filename: function (req, file, cb) {

        // 原始名 + 时间 + 原始后缀
        var originalname = file.originalname;
        var lastIndex = originalname.lastIndexOf('.');

        var filename = originalname.slice(0, lastIndex);
        var fileExt = originalname.slice(lastIndex);

        cb(null, filename + '-' + Date.now() + fileExt);
    }
})

var upload = multer({ storage: storage });

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

router.post('/update',function(req,res){
    //更新数据
    tcModal.edit(req.body,function (err,result) {
        if(err)  return;
        res.json({
            code:200,
            msg:'设置成功！',
            result:{}
        })
    })
    
})

//修改密码
router.get('/repass',function (req,res) {
    res.render('dashboard/repass',{})
})

router.get('/region',function (req,res) {
    res.json(region);
})

//上传头像
router.post('/upfile', upload.single('tc_avatar'),function (req,res) {
  //  console.log(req.file);
   // res.send('上传头像');
    var body = {
        tc_id: req.session.loginfo.tc_id,
        tc_avatar: req.file.filename
    }
    //保存头像
    tcModal.edit(body,function (err,resykt) {
        if(err) return;
        res.json(req.file);
    })
})
