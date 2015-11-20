$(function() {
    //搜索栏的展开和收起
    $("#toggle").click(function() {
        $(this).text($("#content").is(":hidden") ? "收起" : "展开");
        $("#content").slideToggle();
    });
    //标签栏的编辑切换
    $("#tags_edit").click(function() {
        $("li.feedback_tags_li").find('.item').toggle();
        $(this).text($("#tags_delete").is(":hidden") ? "取消编辑" : "编辑");
        $("#tags_delete").toggle();
        if($(this).text()=="取消编辑"){
            $("li.feedback_tags_li").find('a').removeAttr('href');
        }else{
            $("li.feedback_tags_li").find('a').attr('href');
        }

    });
    //标签删除
    $('#tags_delete, #move').click(function(){
        var data = select();
        if(data[2] == 0){
            art.dialog.alert('您还未选择任何项！');
            return false;
        }
        else{
            if($(this).is('#tags_delete')){
                delete_feedback_tags($(this), data[0],data[1]);
            }
        }
    });
    //app应用有变动时，切换版本
    $("#app_id").change(function(){
        getversion();
    });
    //回复用户反馈反馈的收起——回复切换
    $("tr td a.review").click(function() {
        var feedback_review = $(this).parents("tr.feedback_question").next();
        var feedback_question_id = $(this).parents("tr.feedback_question").attr('data-id');
        get_feedback_review(feedback_review,feedback_question_id);
        $(this).text(feedback_review.is(":hidden") ? "收起" : "回复");
        feedback_review.toggle();
    });
    //提交回复用户反馈
    $(".inputdiv > button ").click(function() {
        var feedback_review_module = $(this).parents("tr.feedback_review_module");
        var feedback_review_content = $(this).prev('textarea').val();
        var feedback_question_id = $(this).parents("tr").prev("tr.feedback_question").attr('data-id');
        var app_id = $("#app_id_2").val();
        var platform_id = $("#platform_id_2").val();
        set_feedback_review(feedback_review_module,feedback_question_id,feedback_review_content,app_id,platform_id);
    });
});
//获取选中的标签
function select(){
    var ids = "";
    var forum_ids = '';
    var n = 0;
    $('.item').each(function() {
        if(this.checked){
            ids += $(this).val() + ',';
            n += 1;
            forum_ids += $(this).attr('data-forum_id')+',';
        }
    })

    return [ids.substring(0, ids.length - 1), forum_ids.substring(0, forum_ids.length - 1),n];
};
//根据app，获取相应版本
function getversion(){
    $.ajax({
        type: "post",
        url: "/common/getversion",
        data: {app_id:$("#app_id").val()},
        dataType: "json",
        success: function(data){
            $('#version_id').empty();
            $.each(data,function(name,value) {
                var option = "<option value='"+name+"'>"+value+"</option>";
                $('#version_id').append(option);
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#version_id').empty();
            var option = "<option value='0'selected >全部</option>";
            $('#version_id').append(option);
        }
    });
}

//添加标签的颜色选择器
function change_color()
{
    var tags_color = new jscolor.color(document.getElementById('tags_color'), {});
    tags_color.showPicker();return;
    tags_color.fromString('FFFFFF');
}
//点击回复获取问题反馈回复内容
function get_feedback_review(obj,feedback_question_id){
    $.ajax({
        type: "post",
        url: "/user/get_feedback_review",
        data: {feedback_question_id:feedback_question_id},
        dataType: "json",
        success: function(data){
            obj.find("td div ul").html("");
            obj.find("td div textarea").val("");
            var li ="";
            var reviews_count = 0;
            $.each(data,function(name,value) {
                li += "<li><p>"+value['content']+"</p><span>"+value['created_at']+"</span></li>";
                reviews_count += 1;
            });
            obj.find("td div ul").html(li);
            reviews_count = "(" + reviews_count +")" ;
            obj.prev().find("span.review_count").html(reviews_count);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest);
            alert(textStatus);
            alert(errorThrown);
        }
    });
}
//提交回复
function set_feedback_review(obj,feedback_question_id,feedback_review_content,app_id,platform_id){
    if(feedback_review_content == ""){
        art.dialog.alert('您还未填写任何回复，请填写后再发送！');
        return false;
    }else
        $.ajax({
            type: "post",
            url: "/user/set_feedback_review",
            data: {feedback_question_id:feedback_question_id,feedback_review_content:feedback_review_content,app_id:app_id,platform_id:platform_id},
            dataType: "json",
            success: function(result){
                zz_alert(obj,result.msg, result.code);
                get_feedback_review(obj,feedback_question_id);

                $('#already_close_' + feedback_question_id).replaceWith('<a href="javascript:void(0);" onclick="do_status(' + feedback_question_id + ', 2);">关闭</a>');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                zz_alert(obj,result.msg, result.code);
            }
        });
}
var zz_alert = function(obj,msg,code){
    var second = (typeof(second) == "undefined") ? 5 : second;
    var _obj = (typeof(obj) == "undefined") ? window : obj;
    var timer;
    art.dialog({
        background: '#BBFFFF',
        opacity: 0.1, // 透明度
        lock: true,
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
        close: function () {
            clearInterval(timer);
        }
    }).show();
};
//添加新标签
var add_feedback_tags = function(obj,app_id,platform_id){
    var dialog = art.dialog({
        follow: obj,
        id: 'add_feedback_tags',
        title: '添加新标签',
        width: '300px',
        padding: '20px 5px',
        drag: true,
        ok: function () {
            var that = this;
            var k = 0;
            var feedback_tags_value = $('#feedback_tags_id').val();
            var tags_color = $('#tags_color').val();
            if(feedback_tags_value==""||tags_color==""){
              k = 1
            }else{
                k = 0;
            }
            if(k === 0){
                var param = { feedback_tags_name: feedback_tags_value,tags_color:tags_color,app_id:app_id,platform_id:platform_id};
                var url = '/user/add_feedback_tags';
                art.dialog.confirm( '确定添加？新标签为 ['+feedback_tags_value+']？', function(){
                    $.get( url, param,function(result){
                        _alert(result.msg, result.code);
                        if(result.code){
                            that.close();
                        }
                    }, 'json');
                });
            }

            return false;
        },
        okValue: '确定',
        cancelValue: '取消',
        cancel: function () {}
    });

    $.ajax({
        url: '/user/add_feedback_tags'  ,
        success: function (data) {
            dialog.content(data);
        },
        cache: true
    });
};
//选择反馈列表标签
var get_feedback_question_tag = function(obj,feedback_question_id,app_id,platform_id){
    var dialog = art.dialog({
        follow: obj,
        id: 'select_feedback_tags',
        title: '标签列表',
        width: '300px',
        padding: '20px 5px',
        drag: true,
        ok: function () {
            var that = this;
            var k = 0;
            var feedback_tag_ids = $('#feedback_tag_mapping_id').val();
            if(feedback_question_id==""){
                k = 1
            }else{
                k = 0;
            }
            if(k === 0){
                var param = { feedback_question_id: feedback_question_id,feedback_tag_ids:feedback_tag_ids};
                var url = 'set_feedback_question_tag';
                $.get( url, param,function(result){
                    _alert(result.msg, result.code);
                    if(result.code){
                        that.close();
                    }
                }, 'json');
            }

            return false;
        },
        okValue: '确定',
        cancelValue: '取消',
        cancel: function () {}
    });

    $.ajax({
        url: '../user/get_feedback_tag_mapping?feedback_question_id='+feedback_question_id + '&app_id='+app_id +'&platform_id='+platform_id,
        success: function (data) {
            dialog.content(data);
            $('#feedback_tag_mapping_id').multiselect({
                includeSelectAllOption: true,
                enableCaseInsensitiveFiltering: true,
                buttonText: function(options, select) {
                    if (options.length == 0) {
                        return '请选择标签 <b class="caret"></b>';
                    }else if(options.length > 1){

                        if(options.length !=($('#feedback_tag_mapping_id').siblings('div').find('li').length-1) && $('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).hasClass('active')){
                            $('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).removeClass('active');
                            $('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).find('input').attr('checked',false);
                        }else if(options.length ==($('#feedback_tag_mapping_id').siblings('div').find('li').length-1) && !$('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).hasClass('active')){
                            $('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).addClass('active');
                            $('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).find('input').attr('checked',true);
                        }
                        return options.length + ' 已选择  <b class="caret"></b>';
                    }
                    else{
                        if($('#feedback_tag_mapping_id').siblings('div').length > 0){
                            return $('#feedback_tag_mapping_id').siblings('div').find('button').attr('title') + ' <b class="caret"></b>';
                        }else{
                            var html = '';
                            for(var i = 0 ; i < $('#feedback_tag_mapping_id').find('option').length ; i++)
                            {
                                if($('#feedback_tag_mapping_id').find('option').eq(i).attr('selected') == 'selected'){
                                    if(html==''){
                                        html+=$('#feedback_tag_mapping_id').find('option').eq(i).html();
                                    }else{
                                        html+=','+$('#feedback_tag_mapping_id').find('option').eq(i).html();
                                    }
                                }
                            }
                            return html+' <b class="caret"></b>';
                        }


                    }
                },
                selectAllText: '全部',
                selectAllValue: '',
                maxHeight: 160,
                buttonWidth: 100
            });
            $('.form-group').bind('click',function(){
                var  search_circle_ids_btn = false;
                for(var i = 1 ; i < $('#feedback_tag_mapping_id').siblings('div').find('li').length ; i++)
                {
                    if(!$('#feedback_tag_mapping_id').siblings('div').find('li').eq(i).hasClass('active')){
                        search_circle_ids_btn = true
                    }
                }
                if(search_circle_ids_btn){
                    $('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).removeClass('active');
                    $('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).find('input').attr('checked',false);

                }else{$('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).addClass('active');
                    $('#feedback_tag_mapping_id').siblings('div').find('li').eq(0).find('input').attr('checked',true);
                }
            })

        },
        cache: true
    });
};
//收藏用户反馈
var feedback_collection = function(obj,feedback_question_id,is_collection){
    $.get('/user/feedback_collection', {feedback_question_id: feedback_question_id ,is_collection:is_collection}, function(result){
        _alert(result.msg, result.code);
        if(result.code) that.close();
    }, 'json')
};
//删除
var delete_feedback_tags = function(obj, tag_id,tag_nane){
    var dialog = art.dialog({
        id: 'de_user',
        title: '删除标签',
        width: '265px',
        padding: '20px 5px',
        drag: true,
        ok: function () {
            var that = this;
            var k = 0

            if(k === 0){
                $.get('/user/delete_feedback_tags', {ids:tag_id}, function(result){
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

    dialog.content('是否删除'+tag_nane+'标签');
};


