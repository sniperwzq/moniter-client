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

//定时主题置顶
var art_timing_top_elite = function(obj, topic_id, type){
	var tip = ['','置顶','精华','推荐','位置'];
	var dialog = art.dialog({
		follow: obj,
		id: 'forbidden',
		title: '设置' + tip[type] + '[ID: <span class="red">' + topic_id + '</span>]',
		width: '400px',
		padding: '20px 5px',
		drag: true,
		ok: function () {
			var that = this;
			var k = 0
			var id = $('#id').val();
			var start_obj = $('#start_date');
			var error_1 = start_obj.siblings('label.error');
			var start = start_obj.val();
			var end_obj = $('#end_date');
			var error_2 = end_obj.siblings('label.error');
			var end = end_obj.val();
			var cate_obj = $('#ontop_level');
			var error_3 = cate_obj.siblings('label.error');			
			var level = cate_obj.length ? cate_obj.val() : 0;
			var forum_ids_obj = $('#forum_ids');
			var error_4 = forum_ids_obj.siblings('label.error');
			var forum_ids = $.trim(forum_ids_obj.val());
			if(level < 3 && start == ''){		
				if(error_1.length){
					error_1.show();
				}
				else{
					start_obj.parent().append('<label class="error clear">请填写开始日期</label>');			
				}
				k = 1;
			}
			else{
				error_1.hide();
			}
			
			if(level < 3 && end == ''){		
				if(error_2.length){
					error_2.show();
				}
				else{
					end_obj.parent().append('<label class="error clear">请填写结束日期</label>');			
				}
				k = 1;
			}
			else{
				error_2.hide();
			}
			
			if((type == 1 || type == 4) && cate_obj.length && level == ''){
				if(error_3.length){
					error_3.show();
				}
				else{
					cate_obj.parent().append('<label class="error clear">请选择' + (type == 4 ? '位置' : '类别') + '</label>');			
				}
				k = 1;				
			}
			else if(cate_obj.length && level){
				error_3.hide();
			}
			if( level==1 && forum_ids=='' ){
				if(error_4.length){
					error_4.show();
				}else{
					forum_ids_obj.parent().append('<label class="error clear">请选择所要置顶的圈子</label>');			
				}
				k = 1;	
			}
			else{
				error_4.hide();
			}
			if(k === 0){
				$.get('/topic/set_timimg_top', {id: id, topic_id: topic_id, type: type, start: start, end: end, level: level, forum_ids: forum_ids}, function(result){
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
	
	$('#ontop_level').live('change', function(){
		var obj = $(this);
		if( obj.val()==1 ){
			$('#forum_ids_box').show();
		}else{
			$('#forum_ids_box').hide();
		}
	})
	
	$('.time').live('hover',function(){$(this).datetimepicker();})
	
	$.ajax({
	    url: '/common/get_timing_top_elite?id=' + topic_id + '&type=' + type,
	    success: function (data) {
	        dialog.content(data);
			$('#forum_ids').multiselect({
				includeSelectAllOption: true,
				enableCaseInsensitiveFiltering: true,
				buttonText: function(options, select) {
					if (options.length == 0) {
					  return '请选择数据 <b class="caret"></b>';
					}
					else if (options.length > 0) {
					  return options.length + ' 已选择  <b class="caret"></b>';
					}
				},
				selectAllText: '全选',
				maxHeight: 190,
				buttonWidth: 200
			});
	    },
	    cache: true
	});
	
	
}

//删除话题
var art_delete_timing_topic = function(ids, forum_ids,sign, n){
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
				$.get('/topic/delete_timing_topic', {ids: ids, forum_ids:forum_ids, sign: sign, reason_id: reason_id}, function(result){
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
	    url: '/common/get_delete_topic_reason_list',
	    success: function (data) {
	        dialog.content(data);
	    },
	    cache: true
	});
};


//删除回复
var art_delete_timing_topic_review = function(ids, sign, n){
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
				$.get('/topic/delete_timing_topic_review', {ids: ids, sign: sign, reason_id: reason_id}, function(result){
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
	    url: '/common/get_delete_review_reason_list',
	    success: function (data) {
	        dialog.content(data);
	    },
	    cache: true
	});
};

//删除话题
var art_delete_timing_topic = function(ids, forum_ids,sign, n){
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
				$.get('/topic/delete_timing_topic', {ids: ids, forum_ids:forum_ids, sign: sign, reason_id: reason_id}, function(result){
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
	    url: '/common/get_delete_topic_reason_list',
	    success: function (data) {
	        dialog.content(data);
	    },
	    cache: true
	});
};

$(document).ready(function(){
	//添加主题跳转连接地址
	$('#redirect_topic_id').click(function(){
		art.dialog({
			id: 'redirect_topic_id_box',
			title: '添加跳转主题链接',
			width: '280px',
			padding: '20px 5px',
			drag: true,
			fixed: true,
			ok: function () {
				var topic_id = $('#redirect_topic_id_input').val();
				var forum_id = $('#forums').val();
				var obj = this;
				$.ajax({
					url: '/common/check_is_forum',
					data:{'forum_id' : forum_id,'topic_id':topic_id},
					dataType: 'json',
					success: function (msg) {
						if(msg.s == 'success'){
							insertAtCursor( document.getElementById('content'), '<a href="http://circle.seeyouyima.com/topic/detail-web/?topic_id='+topic_id+'">'+msg.topic_title+'</a>' );
							obj.close();
						}else{
							$('#redirect_topic_id_input').next('label').html( '请填写ID').show();
						}
					},
					cache: false
				});
				return false;
			},
			okValue: '确定',
			cancelValue: '取消',
			content: '<span style="float:left;">话题ID:</span><input style="margin-left:0" id="redirect_topic_id_input" name="redirect_topic_id_input" type="text" class="introduction required pull-left" value="" ><label class="error" style="display:none;" for="title" generated="true"></label>',
			cancel: function () {}
		});
	});
	
	//添加跳转外链地址
	$('#redirect_topic_url').click(function(){
		art.dialog({
			id: 'redirect_topic_id_box',
			title: '添加跳转外部链接',
			width: '380px',
			padding: '20px 5px',
			drag: true,
			fixed: true,
			ok: function () {
				var obj = this;
				var url_link = $('#redirect_topic_url_link').val();
				var url_txt = $('#redirect_topic_url_txt').val();
				var url_type = $('#redirect_topic_url_type').val();
				if( url_link=='' ){
					$('#redirect_topic_url_link').next('label').html( '连接不能为空' ).show();
					return false;
				}
				if( url_txt=='' ){
					$('#redirect_topic_url_txt').next('label').html( '文本不能为空' ).show();
					return false;
				}
				if( url_link.indexOf( '?' )>0 ){
					url_link += '&__type='+url_type;
				}else{
					url_link += '?__type='+url_type;
				}
				insertAtCursor( document.getElementById('content'), '<a href="'+url_link+'">'+url_txt+'</a>' );
				obj.close();
				return false;
			},
			okValue: '确定',
			cancelValue: '取消',
			
			content: '<div class="aui_content" style="padding: 20px 5px;"><table cellspacing="1" cellpadding="6"><tbody><tr><td style="padding:10px 0;font-size:12px;"><strong>链接类型</strong>:</td><td><select id="redirect_topic_url_type" class="left" style="width:150px;height:26px;line-height:26px"><option value="1">外链</option><option value="2">内链</option></select><label class="error" style="display:none;" for="title" generated="true"></td></tr><tr><td style="padding:10px 0;font-size:12px;"><strong>连接地址</strong>:</td><td><input type="text" value="" class="text pull-left required" id="redirect_topic_url_link"><label class="error" style="display:none;" for="title" generated="true"></td></tr><tr><td style="padding:10px 0;font-size:12px;"><strong>连接文本</strong>:</td><td><input type="text" value="" class="text pull-left required" id="redirect_topic_url_txt"><label class="error" style="display:none;" for="title" generated="true"></td></tr></tbody></table></div>',
			cancel: function () {}
		});
	});
	
	//清除空格
	$('#clear').click(function(){
        var obj = $('#content');
        obj.val(obj.val().replace(/(^|\n)\s+/g, "$1"));
    });
});


