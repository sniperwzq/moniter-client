$(function(){
	//全选或全不选
	$('td').shiftcheckbox({
		checkboxSelector: ':checkbox',
		selectAll: $('.all')
	});

	$('#search_circle_ids').multiselect({
		includeSelectAllOption: true,
		enableCaseInsensitiveFiltering: true,
		buttonText: function(options, select) {
			if (options.length == 0) {
			  return '请选择数据 <b class="caret"></b>';
			}else if(options.length > 1){

				if(options.length !=($('#search_circle_ids').siblings('div').find('li').length-1) && $('#search_circle_ids').siblings('div').find('li').eq(0).hasClass('active')){
					$('#search_circle_ids').siblings('div').find('li').eq(0).removeClass('active');
					$('#search_circle_ids').siblings('div').find('li').eq(0).find('input').attr('checked',false);
				}else if(options.length ==($('#search_circle_ids').siblings('div').find('li').length-1) && !$('#search_circle_ids').siblings('div').find('li').eq(0).hasClass('active')){
					$('#search_circle_ids').siblings('div').find('li').eq(0).addClass('active');
					$('#search_circle_ids').siblings('div').find('li').eq(0).find('input').attr('checked',true);
				}

				return  ' 已选择'+options.length+'个  <b class="caret"></b>';
			}
			else{
				if($('#search_circle_ids').siblings('div').length > 0){
					return $('#search_circle_ids').siblings('div').find('button').attr('title') + ' <b class="caret"></b>';
				}else{
					var html = '';
					for(var i = 0 ; i < $('#search_circle_ids').find('option').length ; i++)
					{
						if($('#search_circle_ids').find('option').eq(i).attr('selected') == 'selected'){
							if(html==''){
								html+=$('#search_circle_ids').find('option').eq(i).html();
							}else{
								html+=','+$('#search_circle_ids').find('option').eq(i).html();
							}
						}
					}
					return html+' <b class="caret"></b>';
				}


			}
		},
		selectAllText: '全部',
		selectAllValue: '',
		maxHeight: 190,
		buttonWidth: 100
	});
	$('.form-group').bind('click',function(){
		var  search_circle_ids_btn = false;
		for(var i = 1 ; i < $('#search_circle_ids').siblings('div').find('li').length ; i++)
		{
			if(!$('#search_circle_ids').siblings('div').find('li').eq(i).hasClass('active')){
				search_circle_ids_btn = true
			}
		}
		if(search_circle_ids_btn){
			$('#search_circle_ids').siblings('div').find('li').eq(0).removeClass('active');
			$('#search_circle_ids').siblings('div').find('li').eq(0).find('input').attr('checked',false);

		}else{$('#search_circle_ids').siblings('div').find('li').eq(0).addClass('active');
			$('#search_circle_ids').siblings('div').find('li').eq(0).find('input').attr('checked',true);
		}
	})


	$('#search_options').multiselect({
		buttonText: function(options, select) {

			if (options.length == 0) {
			  return '请选择数据 <b class="caret"></b>';
			}
			else if (options.length > 0) {
          	  return  ' 已选择'+options.length+'个  <b class="caret"></b>';
        	}
		},
		selectAllText: '全选',
		maxHeight: 190,
		//maxWidth: 200,
		buttonWidth: 100
	});

	$('#search_options').parent().find('.multiselect-container input[type="checkbox"]').click(function(){

		var index = [0,2,1,4,3,6,5];
		var val = $(this).val();
		if(this.checked){
			$('#search_options').multiselect('deselect',String(index[val]));
		}
	});

	$('#delete, #move').click(function(){
		var data = select();
		var is_from_user = "<?php echo $flag;?>";
		if(data[2] == 0){
			art.dialog.alert('您还未选择任何项！');
			return false;
		}
		else{
			if($(this).is('#delete')) art_delete_topic(data[0], data[1], data[2],is_from_user);
			else art_move_topic(data[0], 0, data[2]);
		}
	});
	$('#search_options').siblings('.btn-group').click(function(){
		$(this).find('.multiselect-container').width('140px');
	});
	//alert($('#search_options').siblings('.btn-group').find('.multiselect-container').width())
	//
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
	}
	//搜索，排序
	function setSearchForm(order,order_field,sort,sort_type,page_no){
		$('#'+order).val(order_field);
		$('#'+sort).val(sort_type);
		$("#page_no").val(page_no);
		$('#fom').submit();
	}
	
	function cover_sort_box(order_field){
		cur_class = $('#sort_'+order_field).attr('class');
		if(cur_class == 'sort'){
			new_class = 'sort_asc';
		}else if(cur_class == 'sort_asc'){
			new_class = 'sort_desc';
		}else if(cur_class == 'sort_desc'){
			new_class = 'sort_asc';
		}
		$('#sort_box a').removeClass().addClass('sort');
		$('#sort_' + order_field).removeClass().addClass(new_class);
	};
})

