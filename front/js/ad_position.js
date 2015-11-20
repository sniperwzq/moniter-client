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
