define(function (require,exports,module) {
    var $ = require('jquery');

    //时间显示
    var _this=$("input[type='datetime-local']")[0];
    var localtime=$(_this).attr('time');
    localtime=localtime.replace(/\s+/g,'T');
    localtime=localtime.substring(0,16);
    console.log(localtime);
    $("input[type='datetime-local']")[0].value=localtime;

    //提交添加讲师表单
    $('#addTeacher').on('submit',function () {

        //1、将数据提交到  接口
        //2、使用post
        //3、传递哪些参数
        var formData = $(this).serialize();
        var url = $(this).attr('action').trim();
        console.log(url);
        $.ajax({
            url:url,
            type:'post',
            data:formData,
            success:function (info) {
                if(info.code == 200){
                    alert(info.msg);
                    self.location=document.referrer;
                }
            }
        })
        return false;//阻止默认行为
    });

})