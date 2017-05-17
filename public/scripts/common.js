define(function (require,exports,module) {
    var $ = require('jquery');
    //退出
    $('#logout').on('click',function () {
        if(confirm('确定退出？')){
            location.replace(location.protocol+'//'+location.host+'/login');
        }
    })
//下拉菜单伸缩展开
    $('.navs a[href="javascript:;"]').on('click',function(){
        $(this).next('ul').slideToggle();
    })
//选中状态
    $('.navs a').each(function(){
        var _this = $(this),
            href =_this.attr('href').slice(1),
            pathname = location.pathname;
        if(pathname.lastIndexOf(href)==1){
            _this.addClass('active');
            _this.closest('ul').show();
            return false;
        }
    })
})