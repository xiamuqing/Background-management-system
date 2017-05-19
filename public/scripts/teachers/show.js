define(function (require,exports,module) {
    //依赖bootstrap
    var $ = require('jquery');

    var teacherModal = $('#teacherModal');
    $('#teacherList').on('click','a.preview',function () {
        teacherModal.modal();
        
        //阻止默认行为
        return false;
    })

    //搜索讲师
    $('#tSearchForm').on('submit',function () {
        console.log($(this).serialize());
        $.ajax({
            url:'/teacher/search',
            type:'post',
            data:$(this).serialize(),
            success:function (info) {
                console.log(info);
                $('#Tbody').html('');
                var result=info.result;
                for(var i=0; i<result.length; i++){
                    var gender = '男';
                    var statusHtml ='';
                    if(result[i].tc_gender) gender='女';
                    if(result[i].tc_status) {
                        statusHtml="<a href='javascript:;' class='btn btn-danger btn-xs Tstate' tcid='{{this.tc_id}}'>已注销</a>"
                    }else{
                        statusHtml="<a href='javascript:;' class='btn btn-warning btn-xs Tstate' tcid='{{this.tc_id}}'>注 销</a>"
                    }
                    var Thtml="<tr><td>"+ (i-2+3) +"</td>" +
                            "<td>"+ result[i].tc_name +"</td>"+
                            "<td>"+ result[i].tc_roster +"</td>"+
                            "<td>"+ result[i].tc_brithday +"</td>"+
                            "<td>"+gender+"</td>"+
                            "<td>"+ result[i].tc_cellphone +"</td>"+
                        "<td>"+
                            "<a href='javascript:;' data-toggle='modal' class='btn btn-info btn-xs preview' >查 看</a> "+
                            "<a href='/teacher/edit/"+result[i].tc_id+"' class='btn btn-info btn-xs'>编 辑</a>"+
                            statusHtml+
                        "</td>"+
                        "</tr>";
                    $('#Tbody').append(Thtml);
                }
            }
        })
        return false;
    })

    //注销和取消
    $('.Tstate').on('click',function (e) {
        //alert($(e.target).attr('state'));
        var status=$(e.target).attr('state');
        var tcid=$(e.target).attr('tcid');
        $.ajax({
            url: '/teacher/state',
            type: 'post',
            data: {tc_id:tcid},
            success:function (info) {
                if(info.code == 200){
                    location.reload();
                }
            }
        })
    })
})