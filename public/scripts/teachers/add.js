define(function (require,exports,module) {
    var $ = require('jquery');

    //表单验证插件
    require('validate');

    //jquery.form.js专门ajax提交表单
    require('form');

    //时间显示
    var inputs=$("input[type='datetime-local']");
    var localtime;
    for(var i=0;i<inputs.length;i++){
        localtime=$(inputs[i]).attr('time');
        console.log(localtime);
        if(localtime){
            localtime=localtime.replace(/\s+/g,'T');
            localtime=localtime.substring(0,16);
            inputs[i].value=localtime;
        }
    }

    $('#addTeacher').validate({
        //何种条件下触发验证（失去焦点）
        onBlur:true,
        //阻止表单默认提交
        sendForm:false,
        eachInvalidField:function () {
            //当表单元素不合法时，会触此方法
            $(this).parents('.form-group').removeClass('has-success').addClass('has-error');
            $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
        },
        eachValidField:function () {
            //this指每个元素
            $(this).parents('.form-group').removeClass('has-error').addClass('has-success');
            $(this).next().removeClass('glyphicon-remove').addClass('glyphicon-ok');

        },
        valid:function () {
            //所有表单元素都合法才触发
            //this指form标签
            //1、将数据提交到  接口
            //2、使用post
            //3、传递哪些参数 插件自动将表单的元素传递过去
            var url = $(this).attr('action').trim();
            $(this).ajaxSubmit({
                url:url,
                type:'post',
                success:function (info) {
                    if(info.code == 200){
                        alert(info.msg);
                        self.location=document.referrer;
                    }
                }
            })
        }
    })
});