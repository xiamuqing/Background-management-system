define(function (require,exports,module) {
    var $ = require('jquery');
    //提交添加讲师表单
    $('#addTeacher').on('submit',function () {

        //1、将数据提交到  接口
        //2、使用post
        //3、传递哪些参数
        var formData = $(this).serialize();
        $.ajax({
            url:'/teacher/add',
            type:'post',
            data:formData ,
        })
        return false;//阻止默认行为
    });
})