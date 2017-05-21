define(function (require,exports,module) {
    var $ = require('jquery');

    require('form');

    $('#addCourse').on('submit',function () {
        $(this).ajaxSubmit({
            url:'/course/add',
            type:'post',
            success:function (data) {
                if(data.code ==200){
                    location.href = '/course/basic/'+data.result.insertId;
                }
            }
        })
        return false;
    })
})