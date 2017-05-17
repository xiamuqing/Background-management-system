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
            data:formData,
            success:function (info) {
                if(info.code == 200){
                    alert(info.msg);
                    history.go(-1);
                }
            }
        })
        return false;//阻止默认行为
    });

    // //查询讲师
    // $('#tSearchForm').on('submit',function () {
    //     console.log(22)
    //     var formData = $(this).serialize();
    //     console.log(formData)
    //     $.ajax({
    //         url:'/teacher/search',
    //         type:'post',
    //         data:formData,
    //         success:function (info) {
    //             console.log('chxun')
    //         }
    //     })
    //     return false;//阻止默认行为
    // })
})