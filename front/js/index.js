$(document).ready(function(){
	
	$("#right_frame").load(function(){
		var mainheight = $(this).contents().find("body").height()+100;
		$(this).height(mainheight);
	}); 
	
	
	//按钮滑动效果
	$('.btn-sumbit').hover(function(){
		$(this).css({'border-color':'#fd7390','color':'#fd7390'});	
	},function(){
		$(this).css({'border-color':'#ccc','color':'#000'});	
	});
	
	

});
