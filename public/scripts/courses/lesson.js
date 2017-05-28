define(function (require,exports,module) {

    var $ = require('jquery');

    require('form');

    var template = require('template');

    var lessonModal = $('#lesson');

    var save = $('#save');

    //模态框
    $('#addBtn').on('click',function () {
        //调用模板引擎
        var html = template('lessonTpl',{})
        //将表单元素追加再显示
        lessonModal.find('form').html(html);

        lessonModal.modal();
        return false;
    });

    var item = $('#item')
    var total = $('#total');

    //添加课时
    $('#addLesson').on('submit',function () {
        //获得按钮状态
        var key = $(this).attr('data-key');
        console.log(key)
        var lsName = $('[name="ls_name"]').val();
        var lsMinutes = $('[name="ls_minutes"]').val();
        var lsSeconds = $('[name="ls_seconds"]').val();
        var size = item.children().size()+1;

        $(this).ajaxSubmit({
            url:'/course/lesson',
            type:'post',
            success:function (data) {
                console.log(data);
                //添加成功后，需要展示型添加数据
                // var info = {
                //     index:size,
                //     lsName:lsName,
                //     lsDuration:lsMinutes+':'+lsSeconds,
                //
                // }
                // //调用模板
                // var html = template('itemTpl',info);
                // if(key) {
                //     // 替换
                //     item.find('li').eq(key).find('span.name').text(lsName);
                //     item.find('li').eq(key).find('span.duration').text(lsMinutes + ':' + lsSeconds);
                // } else {
                //     // 添加DOM
                //     item.append(html);
                // }
                //
                // //总课时
                // total.text('课时：'+size);
                // //模态框消失
                // lessonModal.modal('hide');
                location.reload();
            }
        })

        return false;
    })

    //编辑、删除
    item.on('click','.btn',function () {
        var _this = $(this),
            parent = _this.parents('li '),
            ls_id = parent.attr('data-id'),
            key = parent.index();
        if(_this.is('.edit')){
            save.attr('data-key',key);
            $.ajax({
                url:'/course/lesson/edit',
                type:'post',
                data:{ls_id:ls_id},
                success:function (data) {
                    //console.log(data);
                    //调用模板引擎 
                    data.ls_minutes = data.ls_video_duration.split(':')[0];
                    data.ls_seconds = data.ls_video_duration.split(':')[1];
                    var html = template('lessonTpl',data);
                    $('#addLesson').html(html);
                    lessonModal.modal();
                }
            })
        }
        if(_this.is('.delete')){
           if(confirm('确定删除该课程吗？')){
               $.ajax({
                   url:'/course/lesson/delete',
                   type:'post',
                   data:{ls_id:ls_id},
                   success:function (data) {
                       if(data.code==200){
                           alert(data.info)
                           location.reload();
                       }
                   }
               })
           }
        }
    });

    //搜索课程
    $('#cSearchForm').on('submit',function () {
        console.log($(this).serialize());
        $.ajax({
            url:'/course/search',
            type:'post',
            data:$(this).serialize(),
            success:function (info) {
                console.log(info.result);
                $('#Csbody').html('');
                var result=info.result,
                    imgHtml;
                for(var i=0; i<result.length; i++){
                    if(result[i].cs_cover) {
                        imgHtml="<img src='/thumbs/"+result[i].cs_cover+"' >";
                    }else{
                        imgHtml="<img src='/course.png'>";
                    }
                    var Thtml="<div class='course'>" +
                        "<div class='pic'> "+imgHtml+"</div>" +
                        "<div class='info'>" +
                        "<a href='/course/basic/"+result[i].cs_id+"'>"+result[i].cs_name+"</a>" +
                        "<ul class='list-unstyled'>" +
                        "<li> <span>讲师："+result[i].tc_name+"</span> <span>类别："+result[i].cg_name+"</span> </li>"+
                        "<li><span>浏览：</span><span></span> </li>"
                        "</ul></div></div>"

                    $('#Csbody').append(Thtml);
                }
            }
        })
        return false;
    })
    
    
    
})