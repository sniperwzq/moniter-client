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


var _alert_one = function(msg, code,obj, second, url){
	//var scrollTop = $(document).scrollTop();
	var second = (typeof(second) == "undefined") ? 5 : second; 
	var _obj = (typeof(obj) == "undefined") ? window : obj;
	var timer;
	art.dialog({
		left:'50%',
		top:'300px',
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

//设置标签
var art_set_topic_tag = function(obj,id, forum_id, tag_id,n){
	var str = (typeof(n) == "undefined") ? '' : '[共 <font color="red">' + n + '</font> 条]'; 
	var dialog = art.dialog({
		id: 'move',
		title: '设置标签' + str,
		width: '280px',
		padding: '20px 5px',
		drag: true,
		fixed: true,
		ok: function () {
			var that = this;
			var k = 0
			var tag_obj = $('#tag_id');
			var error_2 = tag_obj.siblings('label.error');
			var tag_id = tag_obj.val();
			
			
			if(tag_id == '' || tag_id == 0){		
				if(error_2.length){
					error_2.show();
				}
				else{
					tag_obj.parent().append('<label class="error clear">请选择标签</label>');			
				}
				k = 1;
			}
			else{
				error_2.hide();
			}
			
			if(k === 0){
				$.get('/topic/set_topic_tag', {id: id, tag_id: tag_id}, function(result){
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
	    url: '/common/get_circle_tag_list?fid=' + forum_id+'&tag_id='+tag_id ,
	    success: function (data) {
	        dialog.content(data);
	    },
	    cache: true
	});
}

//置顶
var art_top_elite = function(obj, topic_id, type){
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
				$.get('/topic/set_top', {id: id, topic_id: topic_id, type: type, start: start, end: end, level: level, forum_ids: forum_ids}, function(result){
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
	
	//$('.time').live('hover',function(){$(this).datetimepicker();})
	
	$.ajax({
	    url: '/common/get_top_elite?id=' + topic_id + '&type=' + type,
	    success: function (data) {
	        dialog.content(data);
			$('#forum_ids').multiselect({
				includeSelectAllOption: true,
				enableCaseInsensitiveFiltering: true,
				buttonText: function(options, select) {
					if (options.length == 0) {
					  return '请选择数据 <b class="caret"></b>';
					}else if(options.length > 2){
						return  ' 已选择'+options.length+'个  <b class="caret"></b>';
					}
					else{
						//return $('#forum_ids').siblings('div').find('button').attr('title') + ' <b class="caret"></b>';	
						if($('#forum_ids').siblings('div').length > 0){
							return $('#forum_ids').siblings('div').find('button').attr('title') + ' <b class="caret"></b>';				
						}else{
							var html = '';
							for(var i = 0 ; i < $('#forum_ids').find('option').length ; i++)
							{
								if($('#forum_ids').find('option').eq(i).attr('selected') == 'selected'){
									if(html==''){
										html+=$('#forum_ids').find('option').eq(i).html();	
									}else{
										html+=','+$('#forum_ids').find('option').eq(i).html();		
									}	
								}	
							}
							return html+' <b class="caret"></b>';	
						}			
					}
				},
				selectAllText: '全选',
				maxHeight: 190,
				buttonWidth: 200
			});
	    },
	    cache: true
	});
	
	/*$('.btn-group').bind('click',function(){
		var  search_circle_ids_btn = false;	
		for(var i = 1 ; i < $('#forum_ids').siblings('div').find('li').length ; i++)
		{
			if(!$('#forum_ids').siblings('div').find('li').eq(i).hasClass('active')){
				search_circle_ids_btn = true	
			}
		}	
		if(search_circle_ids_btn){
			$('#forum_ids').siblings('div').find('li').eq(0).removeClass('active');
			$('#forum_ids').siblings('div').find('li').eq(0).find('input').attr('checked',false);
			
		}else{$('#forum_ids').siblings('div').find('li').eq(0).addClass('active');
			$('#forum_ids').siblings('div').find('li').eq(0).find('input').attr('checked',true);	
		}
	})*/
}

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

//设置浏览量
var art_change_view = function(obj, topic_id){
	var dialog = art.dialog({
		follow: obj,
		id: 'forbidden',
		title: '更改话题浏览量[ID: <span class="red">' + topic_id + '</span>]',
		width: '300px',
		padding: '20px 5px',
		drag: true,
		ok: function () {
			var that = this;
			var k = 0;
			var topic_value = parseInt($('#set_topic_value').val());

			if( topic_value<=0 || isNaN(topic_value) ){
				$('#set_topic_value').next().show();
				k = 1;
			}else{
				k = 0;
			}
			if(k === 0){
				var paramt = { topic_id: topic_id, topic_value: topic_value};
				var url = '/topic/set_topic_view_count';
				art.dialog.confirm( '确定修改？浏览量为 ['+topic_value+']？', function(){
					$.get( url, paramt, function(result){
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
	    url: '/topic/set_topic_view_count?topic_id=' + topic_id,
	    success: function (data) {
	        dialog.content(data);
	    },
	    cache: true
	});
}

//移贴
var art_move_topic = function(ids, fid, n){
	var str = (typeof(n) == "undefined") ? '' : '移贴[ 共 <font color="red">' + n + '</font> 条]'; 
	var dialog = art.dialog({
		id: 'move',
		title: str ,
		width: '280px',
		padding: '20px 5px',
		drag: true,
		fixed: true,
		ok: function () {
			var that = this;
			var k = 0
			var circle_obj = $('#circle_id');
			var error_1 = circle_obj.siblings('label.error');
			var circle_id = circle_obj.val();
			
			var tag_obj = $('#tag_id');
			var error_2 = tag_obj.siblings('label.error');
			var tag_id = tag_obj.val();
			
			if(circle_id == ''){		
				if(error_1.length){
					error_1.show();
				}
				else{
					circle_obj.parent().append('<label class="error clear">请选择圈子</label>');
					return false;
				}
				k = 1;
			}
			else{
				error_1.hide();
			}
			
			if(tag_id == '' || tag_id == 0){		
				if(error_2.length){
					error_2.show();
				}
				else{
					tag_obj.parent().append('<label class="error clear">请选择标签</label>');			
				}
				k = 1;
			}
			else{
				error_2.hide();
			}
			
			if(k === 0){
				$.get('/topic/move_topic', {ids: ids, circle_id: circle_id, tag_id: tag_id}, function(result){
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
	
	

	
	$('#circle_id').live('change',function(){
        var id = $(this).val();
    	$.get('/common/get_circle_tag', {id: id}, function(msg){
    		var html = "<option value='0'>请选择标签</option>";
        	if(msg.s == 'success'){ 	
        		for(var i in msg.r){
            		html += "<option value='" + msg.r[i].id + "'" + ">" + msg.r[i].name + "</option>";  
        		}
        		$('#tag_id').html(html);
        	}
        	else{
        		$('#tag_id').html(html);
        	}
    	}, 'json');
    });
	
	$.ajax({
	    url: '/common/get_circle_list?fid=' + fid ,
	    success: function (data) {
	        dialog.content(data);
			$("#circle_id").multiselect({
				enableCaseInsensitiveFiltering: true,
				maxHeight: 190,
				buttonWidth: 200
			});
	    },
	    cache: true
	});
}

//删除话题
var art_delete_topic = function(ids, forum_ids, n, is_from_user){
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
				$.get('/topic/delete_topic', {ids: ids, forum_ids:forum_ids, reason_id: reason_id}, function(result){
					_alert(result.msg, result.code);
					if(result.code) {that.close();/*location.href='/topic/topic_list?flag='+is_from_user;*/}
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

//禁言
var art_forbidden = function(obj, id,screen_name, mac, tid, rid, is_show){
	var dialog = art.dialog({
		follow: obj,
		id: 'forbidden',
		title: '禁言设置',
		width: '265px',
		padding: '20px 5px',
		drag: true,
		ok: function () {
			var that = this;
			var k = 0
			var type_obj = $('#type');
			var error_1 = type_obj.siblings('label.error');
			var type = type_obj.val();
			var reason_obj = $('#reason_id');
			var error_2 = reason_obj.siblings('label.error');
			var reason_id = reason_obj.val();

			if(type == ''){		
				if(error_1.length){
					error_1.show();
				}
				else{
					type_obj.parent().append('<label class="error clear">请选择类型</label>');
				}
				k = 1;
			}
			else{
				error_1.hide();
			}
			if(reason_id == '' && type > 0){
				if(error_2.length){
					error_2.show();
				}
				else{
					reason_obj.parent().append('<label class="error clear">请选择理由</label>');			
				}
				k = 1;
			}
			else{
				error_2.hide();
			}
			reason_id = reason_id?reason_id:0;
			if(k === 0){
				$.get('/user/set_forbidden', {id: id, type: type, reason_id: reason_id, mac: mac, tid: tid, rid: rid}, function(result){
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
	    url: '../common/get_forbidden_list?uid=' + id + '&mac=' + mac+'&is_show='+is_show +'&screen_name=' + screen_name,
	    success: function (data) {
	        dialog.content(data);
	    },
	    cache: true
	});
};

//禁言-用户管理
var art_forbidden_one = function(obj, id,screen_name, mac, tid, rid, is_show){
	var dialog = art.dialog({
		follow: obj,
		id: 'forbidden',
		title: '禁言设置',
		width: '265px',
		padding: '20px 5px',
		drag: true,
		ok: function () {
			var that = this;
			var k = 0
			var type_obj = $('#type');
			var error_1 = type_obj.siblings('label.error');
			var type = type_obj.val();
			var reason_obj = $('#reason_id');
			var error_2 = reason_obj.siblings('label.error');
			var reason_id = reason_obj.val();

			if(type == ''){		
				if(error_1.length){
					error_1.show();
				}
				else{
					type_obj.parent().append('<label class="error clear">请选择类型</label>');
				}
				k = 1;
			}
			else{
				error_1.hide();
			}
			if(reason_id == '' && type > 0){
				if(error_2.length){
					error_2.show();
				}
				else{
					reason_obj.parent().append('<label class="error clear">请选择理由</label>');			
				}
				k = 1;
			}
			else{
				error_2.hide();
			}
			reason_id = reason_id?reason_id:0;
			if(k === 0){
				$.get('/user/set_forbidden', {id: id, type: type, reason_id: reason_id, mac: mac, tid: tid, rid: rid}, function(result){
					_alert_one(result.msg, result.code);
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
	    url: '../common/get_forbidden_list?uid=' + id + '&mac=' + mac+'&is_show='+is_show +'&screen_name=' + screen_name,
	    success: function (data) {
	        dialog.content(data);
	    },
	    cache: true
	});
};

//删除回复
var art_delete_review = function(ids, sign, n){

	var str = (typeof(n) == "undefined") ? '' : '[共 <font color="red">' + n + '</font> 条]';
	var dialog = art.dialog({
		id: 'reason',
		title: '理由选择' + str,
		width: '280px',
		padding: '20px 5px',
		drag: true,
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
				$.get('/topic/delete_review', {ids: ids, sign: sign, reason_id: reason_id}, function(result){
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

//删除回复
var art_delete_review_tow = function(ids, sign, n,obj){

	var str = (typeof(n) == "undefined") ? '' : '[共 <font color="red">' + n + '</font> 条]';
	var dialog = art.dialog({
		follow: obj,
		id: 'reason',
		title: '理由选择' + str,
		width: '280px',
		padding: '20px 5px',
		drag: true,
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
				$.get('/topic/delete_review', {ids: ids, sign: sign, reason_id: reason_id}, function(result){
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
           /* var app_id = $('#app_id_2').val();
            var platform_id = $('#platform_id_2').val();*/
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

$(document).ready(function(){

    $("#create_url").click(function(){
        art.dialog.open('/common/create_url',{'title':'生成跟踪链接', 'width':'650px', 'height':'400px', 'lock':true,close: function () {
            var final_url= art.dialog.data('final_url');// 读取B页面的数据
            if(final_url != '' || typeof final_url != 'undefined'){
                $("input[name='url']").val(final_url);
            }
        }
        });
    });

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
							$('#redirect_topic_id_input').next('label').html('请填写ID').show();
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
	/*$('#redirect_topic_url').click(function(){
		art.dialog({
			id: 'redirect_topic_id_box',
			title: '添加跳转链接',
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
	*/
	
	//添加跳转外链地址
	$('#redirect_topic_url').click(function(){
		var dialog = art.dialog({
			id: 'redirect_topic_id_box',
			title: '添加跳转链接',
			width: '380px',
			padding: '20px 5px',
			drag: true,
			fixed: true,
			ok: function () {
				var obj = this;
				
				var url_type = $('#redirect_topic_url_type').val();
				switch(url_type){
	        		case '1':
	        		case '2':
	        			var url_link = $('#redirect_topic_url_link').val();
	    				var url_txt = $('#redirect_topic_url_text').val();
	        			if( url_link == '' ){
	    					$('#redirect_topic_url_link').next('label').html( '连接不能为空' ).show();
	    					return false;
	    				}
	    				if( url_txt == '' ){
	    					$('#redirect_topic_url_text').next('label').html( '文本不能为空' ).show();
	    					return false;
	    				}
	        			break;
	        		case '3':
	        			var url_link = 'xixiaoyou.com';
	    				var url_txt = $('#redirect_mall_url_text').val();
	        			if( url_txt == '' ){
	    					$('#redirect_mall_url_text').next('label').html( '文本不能为空' ).show();
	    					return false;
	    				}
	        			break;
	        		case '4':
	        			var url_link = 'xixiaoyou.com';
	        			var skin_id = $('#redirect_skin_id').val();
	        			var url_txt = $('#redirect_skin_url_text').val();
	        			if( skin_id == '' ){
	    					$('#redirect_mall_url_text').next('label').html( '皮肤ID不能为空' ).show();
	    					return false;
	    				}
	        			if( url_txt == '' ){
	    					$('#redirect_skin_url_text').next('label').html( '文本不能为空' ).show();
	    					return false;
	    				}
	        			url_link = url_link + '?skinid=' + skin_id;
	        			break;
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
			cancel: function () {}
		});
		
		$.ajax({
		    url: '/common/get_redirect_page',
		    success: function (data) {
		        dialog.content(data);
		        $('#redirect_topic_url_type').change(function(){
		        	var url_type = $(this).val();
		        	switch(url_type){
		        		case '1':
		        		case '2':
		        			$('tr[class*="type_select_box"]').hide();
		        			$('#type_box_1').show();
		        			$('#type_box_2').show();
		        			break;
		        		case '3':
		        			$('tr[class*="type_select_box"]').hide();
		        			$('#type_box_3').show();
		        			break;
		        		case '4':
		        			$('tr[class*="type_select_box"]').hide();
		        			$('#type_box_4').show();
		        			$('#type_box_5').show();
		        			break;
		        	}
		        });
                $("#create_url").click(function(){
                    art.dialog.open('/common/create_url',{'title':'生成跟踪链接', 'width':'650px', 'height':'400px', 'lock':true,close: function () {
                        var final_url= art.dialog.data('final_url');// 读取B页面的数据
                        if(final_url != '' || typeof final_url != 'undefined'){
                            $("#redirect_topic_url_link").val(final_url);
                        }
                    }
                    });
                });
		    }
		});
	});
	
	//清除空格
	$('#clear').click(function(){
        var obj = $('#content');
        obj.val(obj.val().replace(/(^|\n)\s+/g, "$1"));
    });
});


