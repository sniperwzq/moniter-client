function insertAtCursor(myField, myValue) {
	//IE support
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		sel.select();
	}
	//MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		// save scrollTop before insert www.keleyi.com
		var restoreTop = myField.scrollTop;
		myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
		if (restoreTop > 0) {
			myField.scrollTop = restoreTop;
		}
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
	} else {
		myField.value += myValue;
		myField.focus();
	}
}

//表情标签
$(document).ready(function(){
    if($('#emoji_code').length > 0){
        $('#emoji_code').click(function(){
            art.dialog.open("/common/get_emoji", {
                title: '添加表情',
                id: 'emoji_code',
                opacity:0.1
            });
        });
    }

    if($(".conft pre").length > 0){
        $(".conft pre").each(function(index){
            var txt = $(this).html();

//        var keys = txt.match(/[\[,\{,\(]+.*?[\],\},\)]+/gi);
            var keys=expression_info.names();
            var msg = format_expression(txt,keys);
            $(this).html(msg);
        });
    }

    if($(".re_con").length > 0){
        $(".re_con").each(function(index){
            var txt = $(this).html();

//        var keys = txt.match(/[\[,\{,\(]+.*?[\],\},\)]+/gi);
            var keys=expression_info.names();
            var msg = format_expression(txt,keys);
            $(this).html(msg);
        });
    }

    if($(".quote pre").length > 0){
        $(".quote pre").each(function(index){
            var txt = $(this).html();

//        var keys = txt.match(/[\[,\{,\(]+.*?[\],\},\)]+/gi);
            var keys=expression_info.names();
            var msg = format_expression(txt,keys);
            $(this).html(msg);
        });
    }

    if($("#add_video").length > 0){
        //视频上传
        $("#add_video").click(function(){
            art.dialog.open("/common/add_video",{
                title:'上传视频',
                id:'add_video',
                opacity:0.1,
                close:function(){
                    var video_url = art.dialog.data('video_url');
                    var video_cover = art.dialog.data('video_cover');
                    if(video_url != '' || video_cover != ''){
                        $("#video_url").val(video_url);
                        $("#video_cover").val(video_cover);
                    }
                }
            });
        });
    }

    if($("#add_audio").length > 0){
        //上传、删除图片、视频==================================

        winopen = art.dialog;
        function winopen_close(){
            winopen.close();
        }

        $("#add_audio").click(function(){
            winopen.open("/common/upload_audio?dir=audio&do_js=1&audio_name=video_url",{lock:true,title:'上传视频',close:function(){
                var file_name = art.dialog.data('file_name');
                if(typeof file_name != 'undefined' && file_name != ''){
                    $("#video_url").val(file_name);
                    $("#img").attr('src',file_name+'?vframe/jpg/offset/1/w/480/h/360');
                    $("#video_cover").val(file_name+'?vframe/jpg/offset/1/w/480/h/360');
                }

            }});

        });

        $("#img_button").click(function(){
            winopen.open("/common/file_upload?dir=audio_cover&do_js=1&img_name=img&icon_input=video_cover&is_video=1",{lock:true,title:'上传图片',close:function(){
                var img_src = art.dialog.data('img_src');

                $("#img").attr('src',img_src);
                $("#video_cover").val(img_src);
            }});

        });

        $("#delete_img").click(function(){
            $("#img").attr('src','/front/img/default-120.png');
            $("#video_cover").val('');
        });
    }



});

function add_emoji( id_name, content ){
	insertAtCursor( document.getElementById( id_name ), content )
}


//表情转换
function format_expression(source_txt,keys){

    for(var i in keys){
        if(expression_info.has_name(keys[i])){
            var regexp_temp = keys[i].replace('[','\\[').replace(']','\\]');
            var img = '<img src="'+expression_info.icon(keys[i])+'" style="width:50px;height:50px;" />';
            source_txt = source_txt.replace(new RegExp(regexp_temp,"g"),img);

        }
    }
    return source_txt;
}

//时间格式转时间戳
function datetime_to_unix(datetime){
    var tmp_datetime = datetime.replace(/:/g,'-');
    tmp_datetime = tmp_datetime.replace(/ /g,'-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return parseInt(now.getTime()/1000);
}
//时间戳转时间格式
function unix_to_datetime(unix) {
    var now = new Date(parseInt(unix) * 1000);
    return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

//清除空格
function clear_space(content_id)
{
	var obj = $('#'+content_id);
	//空行清理
	content_res = obj.val().replace(/(^|\n)\s+/g, "$1");
	
	//空格清理
	//var regExp = new RegExp(" ","g");	
	//content_res = obj.val().replace(regExp , ""); 
	
	obj.val(content_res);
}

//消息提醒：有回复我的马甲就提醒
fetchMsg();
var int = self.setInterval("fetchMsg()",5*60*1000);
function fetchMsg(){
	/*$.ajax({
	   type: "POST",
	   url: "/common/fetch_message",
	   dataType: 'json',
	   data: {'t':Math.random()},
	   success: function(r){
		   if(r.status == 'success' && r.count != 0){
			   //$('#hasmsg b').text(r);
			   $('#hasmsg').show();
		   }else{
			   $('#hasmsg').hide();
		   }
	   },
	   complete: function (XHR, TS) { XHR = null ;}
	}); */
}





