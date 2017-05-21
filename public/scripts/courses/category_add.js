define(function (require,exports,module) {
    var $ = require('jquery');

    //表单验证插件
    require('validate');

    require('form');
    
    $('#addCategory').validate({
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
            var url = $(this).attr('action').trim();
            $(this).ajaxSubmit({
                url:url,
                type:'post',
                success:function (data) {
                    alert(data.msg);
                    if(data.code ==200){
                        location.reload();
                    }
                }
            })
        }
    })
})