var express = require ('express');

var bodyParser = require('body-parser');

//cookie 中间件
var cookieParser = require('cookie-parser');

//session中间件
var session = require('express-session');

var app = express();

//设置模板引擎，模板位置
app.set('views',__dirname +'/views');
//使用xtpl模板
app.set('view engine','xtpl');

//应用cookie  此中间件会在响应中设置cookie方法
app.use(cookieParser());

//应用session
//req添加一个属性 session
app.use(session({
    secret:'keyboard cat',
    resave:false
}));

// 解析 application/x-www-form-urlencoded 将数据绑定在req中
app.use(bodyParser.urlencoded({ extended: false }));


//设置目录
var index = require('./controllers/index');
var user = require('./controllers/user');
var teacher = require('./controllers/teacher');
var login = require('./controllers/login');

app.use('/',express.static('public'));
app.use('/',express.static('uploads'));

app.use(function (req,res,next) {
    var url = req.originalUrl;
    var loginfo = req.session.loginfo;

    //app.locals express提供的一个全局的对象
    //在这个对象的数据可以在任何视图上获得
    var loginfo = req.session.loginfo;
    app.locals.loginfo = loginfo;

    if(url !='/login'&& !loginfo){
        //未登录&当前网页不是login 就跳转
        res.redirect('/login');
    }
    next();
})

app.use('/',index);
app.use('/user',user);
app.use('/teacher',teacher);
app.use('/login',login);

app.listen(3000);