define(function (require,exports,module) {
    var $ = require('jquery');
    require('form');

    //富文本框
    var ckeditor = require('ckeditor');
    ckeditor.replace('courseBrief');


    //提交表单
    $('#basicCourse').on('submit',function () {
        // 提交ckeditor数据
        for(instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
        }
        $(this).ajaxSubmit({
            url:'/course/basic',
            type:'post',
            success:function (data) {
                if(data.code ==200){
                    location.href = '/course/picture/' + data.result.cs_id;
                }

            }
        });
        return false;
    })

    //获取子分类
    $('#topCategory').on('change',function () {
        var _this =$(this);
        $.ajax({
            url: '/course/getChild',
            type: 'post',
            data: {cg_id: $(this).val()},
            success: function (data) {
                //console.log(data);
                var html = '';
                for(var i=0; i<data.result.length; i++) {
                    html += '<option value="'+ data.result[i].cg_id +'">' + data.result[i].cg_name + '</option>';
                }
                _this.next('select').html(html);
            }
        });
    })
})