/**
 *
 */
var _alert = function(msg, code, second, url, obj){
    var second = (typeof(second) == "undefined") ? 5 : second;
    var _obj = (typeof(obj) == "undefined") ? window : obj;
    var timer;
    art.dialog({
        width: '200px',
        icon: 'warning',
        content: msg,
        init: function () {
            if(second){
                var that = this;
                var fn = function () {
                    that.title(second + '秒后关闭');
                    !second && that.close();
                    second --;
                };
                timer = setInterval(fn, 1000);
                fn();
            }
        },
        ok: function() {
            clearInterval(timer);
            if(code){
                if(url){
                    _obj.location.href = url;
                }
                else{
                    _obj.location.reload();
                }
            }
        },
        close: function () {
            clearInterval(timer);
            if(code) {
                if(url){
                    _obj.location.href = url;
                }
                else{
                    _obj.location.reload();
                }
            }
        }
    }).show();
};


//更改通信状态===============
function change_user_disabled(id,status){
    var text = '';
    if(status == '0'){
        text = '确定禁用该用户的即时通信功能?';
    }else if(status == '1'){
        text = '确认开启该用户的即时通信功能?';
    }
    art.dialog.confirm(text, function(){
        $.get('/message/change_user_disabled', {id: id,status:status}, function(result){
//            _alert(result.msg, result.code);
//            if(result.code) that.close();
            window.location.reload();
        }, 'json');
    })
}

//更改通信状态===============
function change_user_talk_status(id,status){
    var text = '';
    if(status == '0'){
        text = '确定禁用该用户的蜜友圈发表功能?';
    }else if(status == '1'){
        text = '确认开启该用户的蜜友圈发表功能?';
    }
    art.dialog.confirm(text, function(){
        $.get('/message/change_user_talk_status', {id: id,status:status}, function(result){
            _alert(result.msg, result.code);
        }, 'json');
    })
}

//用户举报详情
function report_detail(fuid,t){
    var dialog = art.dialog({
        follow:t,
        title: '举报详情',
        width: '400px',
        padding: '20px 5px',
        drag: true,
        fixed: true,
        ok: function () {
        },
        okValue: '确定',
        cancelValue: '取消',
        cancel: function () {}
    });

    $.ajax({
        url: '/common/report_detail?id=' + fuid,
        success: function (data) {
            dialog.content(data);
        },
        cache: true
    });
}


//密友圈举报详情
function user_complain_detail(uid,t){
    var dialog = art.dialog({
        follow:t,
        title: '举报详情',
        width: '400px',
        padding: '20px 5px',
        drag: true,
        fixed: true,
        ok: function () {
        },
        okValue: '确定',
        cancelValue: '取消',
        cancel: function () {}
    });

    $.ajax({
        url: '/common/user_complain_detail?uid=' + uid,
        success: function (data) {
            dialog.content(data);
        },
        cache: true
    });
}