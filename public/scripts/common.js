define(function (require,exports,module) {
    var $ = require('jquery');
    
    //进度条
    var NProgress = require('nprogress');
 
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

    NProgress.start();
    NProgress.done();

})