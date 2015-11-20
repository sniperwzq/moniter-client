/**
 * Created by meetyou on 14-11-3.
 */

//用户详情列表数据展示
$('.show-data').bind('click',function(){
    var op = $(this).attr("data-v");
    var url = $(this).attr("data-url");
    $.ajax({
        type: "POST",
        url: url,
        data: {op:op},
        dataType: 'json',
        success: function( res ){
            if(res.code){

            }else{

            }
        }
    });
});


//ul->li下的点击事件
$('.nav-pills > li').each(function(index){
    $(this).click(function(){
        $('.nav-pills > li').removeClass('active');
        var url = $(this).attr("data-url");
        $('#test').attr('src',url);
        if(index == 0){
            $(this).addClass('active');
        }
        if(index == 1){
            $(this).addClass('active');
        }
        if(index == 2){
            $(this).addClass('active');
        }
        if(index == 3){
            $(this).addClass('active');
        }
        if(index == 4){
            $(this).addClass('active');
        }
        if(index == 5){
            $(this).addClass('active');
        }
        if(index == 6){
            $(this).addClass('active');
        }
        if(index == 7){
            $(this).addClass('active');
        }
        if(index == 8){
            $(this).addClass('active');
        }
    });
});


//删除话题
var art_delete_fakeuser = function(uids, forum_id,n){
    var str = (typeof(n) == "undefined") ? '' : '[共 <font color="red">' + n + '</font> 条]';
    var dialog = art.dialog({
        id: 'reason',
        title: '理由选择' + str,
        width: '280px',
        padding: '20px 5px',
        drag: true,
        fixed: true,
        ok: function () {
            var that = this;
            var k = 0
            var reason_obj = $('#reason_id');
            var error = reason_obj.siblings('label.error');
            var reason_id = reason_obj.val();

            if(reason_id == ''){
                if(error.length){
                    error.show();
                }
                else{
                    reason_obj.parent().append('<label class="error clear">请选择理由</label>');
                }
                k = 1;
            }
            else{
                error.hide();
            }

            if(k === 0){
                $.get('/user/delete_fakeuser', {uids: uids, forum_id:forum_id,reason_id: reason_id}, function(result){
                    _alert(result.msg, result.code);
                    if(result.code) that.close();
                }, 'json')
            }

            return false;
        },
        okValue: '确定',
        cancelValue: '取消',
        cancel: function () {}
    });

    $.ajax({
        url: '/common/get_delete_fakeuser_reason',
        success: function (data) {
            dialog.content(data);
        },
        cache: true
    });
};



