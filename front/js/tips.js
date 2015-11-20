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

//删除话题
var art_delete_tips = function(ids, n){
	//var str = (typeof(n) == "undefined") ? '' : '[共 <font color="red">' + n + '</font> 条]'; 
	var dialog = art.dialog({
		title: '贴士删除' ,
		width: '280px',
		padding: '20px 5px',
		drag: true,
		fixed: true,
		ok: function () {
			var that = this;
			var k = 0
			$.get('/tips/delete_tips', {ids: ids}, function(result){
				_alert(result.msg, result.code);
				if(result.code) that.close();
			}, 'json')
			
			return false;
		},
		okValue: '确定',
		cancelValue: '取消',
		cancel: function () {}
	});
	
	dialog.content('确认删除贴士？');
};
//复制话题
var art_copy_tips = function(ids, n){
	var dialog = art.dialog({
		title: '贴士复制' ,
		width: '280px',
		padding: '20px 5px',
		drag: true,
		fixed: true,
		ok: function () {
			var that = this;
			var k = 0
			$.get('/tips/copy_tips', {ids: ids}, function(result){
				_alert(result.msg, result.code);
			}, 'json')
			that.close();
			return false;
		},
		okValue: '确定',
		cancelValue: '取消',
		cancel: function () {}
	});
	
	dialog.content('确认复制贴士？');
};
