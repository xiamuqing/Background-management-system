exports.getTree = getTree;


function getTree(data,pid) {
    var arr = [];
    var args = arguments;
    (function () {
        for(var i=0;i<data.length;i++){
            if(data[i]['cg_pid'] == pid){
                data[i].childs =[];
                if(args[2]){
                    args[2].push(data[i]);
                }else{
                    arr.push(data[i])
                }
                getTree(data,data[i]['cg_id'],data[i].childs);
            }
        }
    })()
    return arr;
}