define(function (require,exports,module) {
    //依赖bootstrap
    var $ = require('jquery');

    var teacherModal = $('#teacherModal');
    $('#teacherList').on('click','a.preview',function () {
        teacherModal.modal();
        
        //阻止默认行为
        return false;
    })
})