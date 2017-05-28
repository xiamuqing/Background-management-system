var express = require('express');
var router = express.Router();

var path = require('path');

var rootPath = path.join(__dirname,'../')

//分类模型
var cgModel = require('../models/category');
module.exports = router;

//express上传文件插件
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, rootPath + 'uploads/original');
    },
    filename: function (req, file, cb) {

        var originalname = file.originalname;

        var fileName = originalname.slice(0, originalname.lastIndexOf('.'))
        var fileExt = originalname.slice(originalname.lastIndexOf('.'));

        cb(null, fileName + '-' + Date.now() + fileExt);
    }
})

var upload = multer({ storage: storage });

//课程模型
var csModel = require('../models/course');

var common = require('../utils/common')

//讲师模型
var tcModel = require('../models/teacher');

//课s时间模型
var lsModel = require('../models/lesson');

router.get('/add',function (req,res) {
    res.render('courses/add');
})

//课程列表
router.get('/list',function (req,res) {
    //取出所有课程
    csModel.list(function (err,result) {
        if(err) return;
        res.render('courses/list',{courses:result});
    }) 
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

router.get('/basic/:cs_id', function (req, res) {
    var cs_id = req.params.cs_id;

    var data = {};

    // 查出当前课程信息
    csModel.find(cs_id, function (err, result) {
        if(err) return;

        // 课程信息
        data.course = result[0];

        tcModel.show(function (err, rows) {
            if(err) return;

            // 讲师数据
            data.teachers = rows;

            cgModel.getParent(result[0]['cs_cg_id'], function (err, cats) {
                if(err) return;

                var parents = [];
                var children = [];

                for(var i=0; i<cats.length; i++) {
                    if(cats[i]['cg_pid'] == 0) {
                        parents.push(cats[i]);
                        continue;
                    }
                    children.push(cats[i]);
                }

                var category = {
                    parents: parents,
                    children: children
                }

                // 处理分类数据
                data.category = category;

                res.render('courses/basic', data);
            });
        });

    });

});


router.post('/basic', function (req, res) {
    console.log(req.body);
    //调用模型添加数据
    csModel.update(req.body,function (err,result) {
        if(err) return;
        res.json({
            code:'200',
            msg:'完善信息成功',
            result:{
                cs_id:req.body.cs_id
            }
        })
    })
})

//添加封面图
router.get('/picture/:cs_id', function (req, res) {
    var cs_id = req.params.cs_id;
    csModel.find(cs_id,function (err,result) {
        if(err) return;
        var tc_id = result[0]['cs_tc_id'];
        tcModel.find(tc_id,function (err,rows) {
            if(err) return;
            res.render('courses/picture',{course:result[0],teacher:rows[0]});
        })
    })
})

//子分类
router.post('/getChild', function (req, res) {
    var cg_id = req.body.cg_id;
    cgModel.getChild(cg_id,function (err,result) {
        if(err) return;
        res.json({
            code:200,
            msg:'获取成功',
            result:result
        })
    })
})

//上传图片
router.post('/upfile', upload.single('upfile'), function (req, res) {
//upload.single中间件把上传结果返回在req
    //将原始图片存入数据库
    var body = {
        cs_cover_original:req.file.filename,
        cs_id:req.body.cs_id
    }
    csModel.update(body,function (err,result) {
        if(err) return;
        res.json(req.file);
    });

});

//裁切图片
router.post('/crop', function (req, res) {
    // 接收参数
    // 调用裁切工具
    // 将裁切好的图片存到数据库
    var x = req.body.x,
        y = req.body.y,
        w = req.body.w;
    h = req.body.h;
    filename = req.body.cs_cover_original;
    // 调用裁切方法
    common.crop(x, y, w, h, filename, function (path) {
        // 裁切完成后入库
        var body = {
            cs_cover: path,
            cs_id: req.body.cs_id
        }
        // 入库
        csModel.update(body, function (err, result) {
            if(err) return;
            res.json({
                code: 200,
                msg: '裁切成功!',
                result: {
                    cs_id: req.body.cs_id
                }
            })
        });

    });

});

//添加课时
router.get('/lesson/:cs_id', function (req, res) {
    //根据ID 获取课程
    var cs_id = req.params.cs_id;

    var data = {};

    csModel.find(cs_id,function (err,result) {
        if(err) return;
        //查询课程信息
        data.course = result[0];
        var cs_tc_id = result[0].cs_tc_id;
        tcModel.find(cs_tc_id,function (err,row) {
            if(err) return;
            //讲师信息
            data.teacher = row[0];
            var ls_cs_id = cs_id;
            //课时信息
            lsModel.find(ls_cs_id,function (err,lesson) {
                if(err) return;
                data.lesson = lesson;
                res.render('courses/lesson',data);
            })
        });
    })
})

//添加课时
router.post('/lesson',function (req,res) {
   // console.log(req.body);
    //将接收的数据添加到数据库

    var ls_minutes = req.body.ls_minutes;
    var ls_seconds = req.body.ls_seconds;
    
    req.body.ls_video_duration = ls_minutes+':'+ls_seconds;

    delete  req.body.ls_minutes;
    delete  req.body.ls_seconds;

    lsModel.add(req.body,function (err,result) {
        if(err) return;
        
    })

    res.send('11');
})

//编辑课时
router.post('/lesson/edit',function (req,res) {
    var ls_id = req.body.ls_id;
    lsModel.show(ls_id,function (err,result) {
        if(err) return;

        res.json(result[0]);
    });
})