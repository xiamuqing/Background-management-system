var express = require ('express');

var bodyParser = require('body-parser');

var app = express();

//设置模板引擎，模板位置
app.set('views',__dirname +'/views');
//使用xtpl模板
app.set('view engine','xtpl');

// 解析 application/x-www-form-urlencoded 将数据绑定在req中
app.use(bodyParser.urlencoded({ extended: false }));


//设置目录
var index = require('./controllers/index');
var user = require('./controllers/user');
var teacher = require('./controllers/teacher');
var login = require('./controllers/login');

app.use('/',express.static('public'));
app.use('/',express.static('uploads'));

app.use('/',index);
app.use('/user',user);
app.use('/teacher',teacher);
app.use('/login',login);

app.listen(3000);