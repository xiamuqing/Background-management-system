define(function(require,exports,module){

    var $ = require('jquery');
    require('form');
    $('#login').on('submit',function () {
        $(this).ajaxSubmit({
            url:'/login',
            type:'post',
            success:function (data) {
               alert(data.msg);
               if(data.code == 200){
                   location.href = '/'
               }
            }
        });
        return false;
    })
})