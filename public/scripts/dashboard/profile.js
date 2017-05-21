define(function (require,exports,module) {
    var $ = require('jquery');

    //富文本框
    var ckeditor = require('ckeditor');
    ckeditor.replace('teacherIntroduce');

    var region = require('region');

    require('form');

    //时间显示
    var inputs=$("input[type='datetime-local']");
    var localtime;
    for(var i=0;i<inputs.length;i++){
        localtime=$(inputs[i]).attr('time');
       // console.log(localtime);
        if(localtime){
            localtime=localtime.replace(/\s+/g,'T');
            localtime=localtime.substring(0,16);
            inputs[i].value=localtime;
        }
    }

    //省市县
    $('.hometown').region({
        url:'/region'
    })

    //提交表单数据
    $('#updateTeacher').on('submit',function () {
        // 提交ckeditor数据
        for(instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
        }
        $(this).ajaxSubmit({
            url:'/update',
            type:'post',
            success:function (data) {
                alert(data.msg);
                if(data.code==200){
                    location.reload();
                }
            }
        })
        return false;
    })

})