$(function(){
    // 定义域名
//    domain = 'http://analysis.seeyouyima.com/index.php/';
    domain = '';

	//顶部账户信息展示
	$('.content-login').hover(function(){
		$(this).animate({'height':'110px'},{queue:false ,duration:100})
		
	},function(){
		
		$(this).animate({'height':'50px'},{queue:false ,duration:100});	
			
	});
	
	// 顶部导航效果
    $('.content-nav > li').mouseenter(function() {
        var index = $('.content-nav > li').index($('#content-nav-focus'));
        $('.content-nav > li').removeClass('content-nav-focus');
        $(this).addClass('content-nav-focus');
        $('.content-nav > li').eq(index).addClass('content-nav-focus');
    });
    $('.content-nav > li').mouseout(function() {
        var index = $('.content-nav > li').index($('#content-nav-focus'));
        $('.content-nav > li').removeClass('content-nav-focus');
        $('.content-nav > li').eq(index).addClass('content-nav-focus');
    });
	// 侧边导航效果
    var page_index = $('.sidebar-nav > li > a ').index($('.now_page'));
 	if(page_index == -1)
	{
		$('.sidebar-nav-focus').hide();	
	}else{
		$('.sidebar-nav-focus').css('top', 60 + page_index * 26);
		$('.sidebar-nav > li').eq(page_index).addClass('sidebar-nav-hover');		
	};
	
	
	//点击提交按钮
	$('#add-question-content-submit').bind('click',function(){
		var send = $('.send'),
			require = $('.require'),
			number = $('.number'),
			arr = [],
			html = '',
			arr_num = [];
		
		//判断必填项是否都已经填写	
		for(var i = 0 ; i <require.length ; i++)
		{
			if(require.eq(i).val() == '' || require.eq(i).val() == 0)
			{
				arr.push(i);	
			}	
		}
		//判断需要填入数字类型
		for(var i = 0 ; i <number.length ; i++)
		{
			if(!/^[0-9]*$/.test(number.eq(i).val()))
			{
				
				arr_num.push(i);	
			}
				
		}
		if(arr.length > 0)
		{
			for(var i = 0 ; i < arr.length ; i++)
			{
				require.eq(arr[i]).css('border-color','#ff5375');	
			}
			require.eq(arr[0]).ScrollTo(800);		
		}else if(arr_num.length > 0){
			for(var i = 0 ; i < arr_num.length ; i++)
			{
				number.eq(arr_num[i]).css('border-color','#ff5375');	
			}
			alert('填入的必须是数字类型');
			number.eq(arr_num[0]).ScrollTo(800);			
		}else{
			//for(var i = 0 ; i < send.length ; i++)
			//{
			//	html+=send.eq(i).attr('name')+'='+send.eq(i).val()+'&';
			//}
			//html = html.substring(0,html.length-1);
//			//alert(html)	;
            $('form')[0].submit();
		}	
		
	});
	//点击选项卡变色
	$('.require').bind('click',function(){
		$(this).css('border' , '1px solid #ccc');	
			
	});
    //进入页面判断奖励柚币是否必填
    //var is_send = $('#is_send').val();

	//改变是否奖励柚币选项
	$('#is_send').change(function(){
		if($(this).val() == 1)
		{
			$('#num_send').addClass('require');
            $('#num_send').removeAttr('readonly');


		}else{
			$('#num_send').removeClass('require');
            $('#num_send').attr('readonly','readonly');
            $('#num_send').val('0');
		}
		$('#num_send').css('border-color','#ccc');		
	}).trigger('change');
	
	
	
	//编辑页面
	$('.question-table-button').hover(function(){
		$(this).css({'border-color':'#ff5375','color':'#ff5375'});	
	},function(){
		$(this).css({'border-color':'#ccc','color':'#000'});		
	})
	
	//载入默认id
    if($('#nomarl').length > 0 && $('#nomarl').val() != '')
    {
        var val_arr = $('#nomarl').val().split(','),
            question_show_li = $('.question-show').children('li');
        for(var i = 0 ; i < question_show_li.length ; i++)
        {

            question_show_li.eq(i).attr('questionnaire_problem_id',val_arr[i]);
        }


    }

	//单选题操作
	$('#multiple-choice').bind('click',function(){
		var length = $('.question-show').children('li').length;
		var html = '<li type="1" questionnaire_problem_id="0">'+
                    	'<p class="tit"><span class = "question-show-number">'+(length+1)+'</span>.<span class="question-show-title">请在此输入问题标题</span> <span class="question-show-type">[单选题]</span></p>'+
                        '<div class="question-show-install">'+
                        	'<span class="multiple-edit">编辑</span>'+
                            '<span class="question-delete">删除</span>'+
                            '<span class="question-up">上移</span>'+
                            '<span class="question-down">下移</span>'+
                            '<span class="question-top">最前</span>'+
                            '<span class="question-bottom">最后</span>'+
                        '</div>'+
                    '</li>';
        var item=$(html);
        item.data('question-index',length);
        item.appendTo($('.question-show'));
	});
	//多选题操作
	$('#optionality').bind('click',function(){
		var length = $('.question-show').children('li:not(.question-edit)').length;
		var html = '<li type="2" questionnaire_problem_id="0">'+
                    	'<p class="tit"><span class = "question-show-number">'+(length+1)+'</span>.<span class="question-show-title">请在此输入问题标题</span> <span class="question-show-type">[多选题]</span></p>'+
                        '<div class="question-show-install">'+
                        	'<span class="optionality-edit">编辑</span>'+
                            '<span class="question-delete">删除</span>'+
                            '<span class="question-up">上移</span>'+
                            '<span class="question-down">下移</span>'+
                            '<span class="question-top">最前</span>'+
                            '<span class="question-bottom">最后</span>'+
                        '</div>'+
                    '</li>';
			$(html).appendTo($('.question-show'));			
		
	});
	//排序题操作
	$('#sorting').bind('click',function(){
		var length = $('.question-show').children('li:not(.question-edit)').length;
		var html = '<li type="3" questionnaire_problem_id="0">'+
                    	'<p class="tit"><span class = "question-show-number">'+(length+1)+'</span>.<span class="question-show-title">请在此输入问题标题</span> <span class="question-show-type">[排序题]</span></p>'+
                        '<div class="question-show-install">'+
                        	'<span class="sorting-edit">编辑</span>'+
                            '<span class="question-delete">删除</span>'+
                            '<span class="question-up">上移</span>'+
                            '<span class="question-down">下移</span>'+
                            '<span class="question-top">最前</span>'+
                            '<span class="question-bottom">最后</span>'+
                        '</div>'+
                    '</li>';
		$(html).appendTo($('.question-show'));	
					
	});
	
	//填空题操作
	$('#fill-blanks').bind('click',function(){
		var length = $('.question-show').children('li:not(.question-edit)').length;
		var html = '<li type="4" questionnaire_problem_id="0">'+
                    	'<p class="tit"><span class = "question-show-number">'+(length+1)+'</span>.<span class="question-show-title">请在此输入问题标题</span> <span class="question-show-type">[填空题]</span></p>'+
                        '<div class="question-show-install">'+
                        	'<span class="fill-blanks-edit">编辑</span>'+
                            '<span class="question-delete">删除</span>'+
                            '<span class="question-up">上移</span>'+
                            '<span class="question-down">下移</span>'+
                            '<span class="question-top">最前</span>'+
                            '<span class="question-bottom">最后</span>'+
                        '</div>'+
                    '</li>';
		$(html).appendTo($('.question-show'));	
					
	});
	
	//单选题 && 多选题编辑操作
    $('.multiple-edit , .optionality-edit').live('click',function() {
        var mDiv=$(this).parent().parent().find('.question-edit');
        if(mDiv.length==0){
        var appto = $(this).parent('.question-show-install'),
            li = $(this).parent().parent(),

            random = '<input type="checkbox" id="rand" name="check" >选项随机',
            relation = '<input type="checkbox" class="ass" style="margin-left: 20px;"><span><b>关联逻辑</b>当前面题目选中某些选项时才出现此题</span>';
        if (li.next('li').hasClass('question-edit')) {
            return false;
        }
        var li_arr = [],
            multiple_title = '',
            is_required = '',
            jump = 0,
            li_relation,
            most_item = '',
            jump_checked = '';
        if (li.find('p').length != 1) {
            li_arr = li.attr('html').split('%%%');
            li_random = li_arr[0].split('&')[0].split('=')[1];
            li_relation = li_arr[0].split('&')[1].split('=')[1];
            multiple_title = li_arr[0].split('&')[5].split('=')[1];
            is_required = li_arr[0].split('&')[3].split('=')[1];
            jump = li_arr[0].split('&')[7].split('=')[1];
            jump_checked = (jump == 0) ? '' : 'checked="checked"';
            if (li_relation != 0) {
                li.find('.ass').attr('checked', 'checked');
                var tabtxt = 0,
                    tab = '',
                    rearr = li_relation.split(','),
                    tabarr = rearr[1].split(':');

                for (var tabn = 0; tabn <= tabarr.length - 1; tabn++) {

                    if (tabtxt > 0) {
                        tab += ':' + tabarr[tabn];
                    } else {
                        tab += tabarr[tabn];
                    }
                    tabtxt++;
                    relation = '<input type="checkbox" class="ass" style="margin-left: 20px;" checked="checked"><span class="addtab"><a>依赖于第<i>' + rearr[0] + '</i>题的第<b>' + tab + '</b>个选项</a></span>'
                }

            }
            if (li_random == 1) {
                random = '<input type="checkbox" id="rand" name="check" checked="checked" >选项随机'
            }

            if (is_required == 1) {
                is_required = 'checked="checked"';

            } else {
                is_required = '';
            }
            if (jump == 0) {
                jump = '';
            } else {
                jump = 'value=' + jump;
            }

        }

        var html = '<div class="question-edit">' +
            '<p class="question-show-answer question-show-title">题目标题<input type="text" value="' + multiple_title + '"></p>' +
            '<p class="question-show-answer">' +
            '<input type="checkbox" checked="checked" class="is_required" ' + is_required + '>必答题<input type="checkbox" style="margin-left:10%" class="jump-checkbox" ' + jump_checked + '>无条件跳题,填写此题后跳转到<input type="text"  class="jump-number" ' + jump + '>题' +

            '</p>';

        if ($(this).hasClass('optionality-edit')) {
            html += '<table class="question-table" border="1" cellpadding="0" cellspacing="0">' +
            '<tr>' +
            '<th width="50%">题目选项</th>' +
            '<th width="20%">可填空</th>' +
            '<th width="30%">操作</th>' +
            '</tr>';
        } else {
            html += '<table class="question-table" border="1" cellpadding="0" cellspacing="0">' +
            '<tr>' +
            '<th width="40%">题目选项</th>' +
            '<th width="15%">可填空</th>' +
            '<th width="15%"><input type="checkbox" class="jump_questions" checked="checked">跳题</th>' +
            '<th width="30%">操作</th>' +
            '</tr>';
        }
        if (li.find('p').length == 1) {
            var jump_text = '', classes = 'multiple-after optionality-after', p_item_id = $(this).parents('li').find('.question-show-answer');
            if ($(this).hasClass('multiple-edit')) {

                jump_text = '<td class="jump"><input type="text"></td>';
                classes = 'multiple-after';
            }
            html += '<tr questionnaire_problem_item_id="0">' +
            '<td><input type="text" class="tabtit"></td>' + '<td><input name="radio" type="checkbox" style="margin-left:45%" class="radios"></td>' + jump_text +
            '<td class="question-table-tr"><span class="' + classes + '">插入</span><span class="choice-delete">删除</span><span class="choice-up">上移</span><span class="choice-down">下移</span></td>' +
            '</tr>' +
            '<tr questionnaire_problem_item_id="0">' +
            '<td><input type="text" class="tabtit"></td>' + '<td><input name="radio" type="checkbox" style="margin-left:45%" class="radios"></td>' + jump_text +
            '<td class="question-table-tr"><span class="' + classes + '">插入</span><span class="choice-delete">删除</span><span class="choice-up">上移</span><span class="choice-down">下移</span></td>' +
            '</tr>' +
            '<tr questionnaire_problem_item_id="0">' +
            '<td><input type="text" class="tabtit"></td>' + '<td><input name="radio" type="checkbox" style="margin-left:45%" class="radios"></td>' + jump_text +
            '<td class="question-table-tr"><span class="' + classes + '">插入</span><span class="choice-delete">删除</span><span class="choice-up">上移</span><span class="choice-down">下移</span></td>' +
            '</tr>' +
            '<tr questionnaire_problem_item_id="0">' +
            '<td><input type="text" class="tabtit"></td>' + '<td><input name="radio" type="checkbox" style="margin-left:45%" class="radios"></td>' + jump_text +
            '<td class="question-table-tr"><span class="' + classes + '">插入</span><span class="choice-delete">删除</span><span class="choice-up">上移</span><span class="choice-down">下移</span></td>' +
            '</tr>';
        } else {

            var p_item_id = $(this).parents('li').find('.question-show-answer');
            for (var i = 1; i < li_arr.length; i++) {
                var li_arr_arr = li_arr[i].split('&'),
                    li_arr_arr_content = li_arr_arr[0].split('=')[1],
                    li_arr_arr_fill = (li_arr_arr[1].split('=')[1] == 1) ? 'checked="checked"' : '',
                    li_arr_arr_must = (li_arr_arr[2].split('=')[1] == 1) ? 'checked="checked"' : '',
                    li_random = (li_arr_arr[0].split('=')[1] == 1) ? 'checked="checked"' : '',
                    li_arr_arr_jump = '';
                html += '<tr questionnaire_problem_item_id="' + p_item_id.eq(i - 1).attr('questionnaire_problem_item_id') + '">' +
                '<td><input type="text" value="' + li_arr_arr_content + '"></td>' +
                '<td>' +
                '<input name="radio" type="checkbox" style="margin-left:45%" class="radios" ' + li_arr_arr_fill + '>'
                if (li_arr_arr_fill == 'checked="checked"') {
                    html += '<span class="fill-checkbox"><input name="" type="checkbox" ' + li_arr_arr_must + '>必填</span>'

                }
                var classes = 'multiple-after optionality-after', jump_text = '';
                if ($(this).hasClass('multiple-edit')) {
                    li_arr_arr_jump = (li_arr_arr[3].split('=')[1] == 0) ? '' : li_arr_arr[3].split('=')[1];
                    classes = 'multiple-after';
                    jump_text = '<td class="jump"><input type="text" value="' + li_arr_arr_jump + '"></td>';
                }
                html += '</td>' + jump_text + '<td class="question-table-tr"><span class="' + classes + '">插入</span><span class="choice-delete">删除</span><span class="choice-up">上移</span><span class="choice-down">下移</span></td>' +
                '</tr>';
            }

        }
        html += '</table>' + '<div style="width: 90%; margin: 0 auto;">' + random + relation + '</div>';
        if ($(this).hasClass('optionality-edit')) {
            var html_select_least = '',
                html_select_more = '';
            if (li_arr.length > 0) {

                //获取到填写的至少值和至多值
                var html_least_value = li_arr[0].split('&')[9].split('=')[1],
                    html_more_value = li_arr[0].split('&')[10].split('=')[1];
                //加载对应的select选项并且如果有值将值带入
                for (var i = 1; i < li_arr.length; i++) {
                    if (i == html_least_value) {
                        html_select_least += '<option value="' + i + '" selected="selected">--' + i + '--</option>';
                    } else {
                        html_select_least += '<option value="' + i + '">--' + i + '--</option>';
                    }
                    if (i == html_more_value) {
                        html_select_more += '<option value="' + i + '" selected="selected">--' + i + '--</option>';
                    } else {
                        html_select_more += '<option value="' + i + '">--' + i + '--</option>';
                    }

                }
            }
            html_select_least = (html_select_least == '') ? '<option value="1">--1--</option><option value="2">--2--</option>' : html_select_least;
            html_select_more = (html_select_more == '') ? '<option value="1">--1--</option><option value="2">--2--</option>' : html_select_more;
            html += '<div class="question-table-select">至少选<select>' + html_select_least + '</select> 项,至多选<select>' + html_select_more + '</select>项。</div><div class="question-table-button question-table-finish question-table-more">完成</div></li>';
        } else {
            html += '<div class="question-table-button question-table-finish">完成</div></div>';
        }

        $(html).insertAfter(appto);
    }

    });
    //关联逻辑操作

        $('.ass').live('click',function(num){
                if($(this).attr('checked')=='checked'){
                    var liDeta=$(this).parents('li').prevAll(),
                        liorder=liDeta.get().reverse(),
                        opnum='',
                        option='',
                        valnum='',
                        mod='',
                        num=$(this).parents('li').index(),
                        currentEle=$(this).parents('li');
                    if( num==0){
                        alert('第一个不能添加关联逻辑');
                        $(this).attr('checked',false);
                    }else if( liDeta.length==1 && $($(liorder)[0]).attr('type')==3||$($(liorder)[0]).attr('type')==4){
                        alert('此题前面没有单选题跟多选题，无法设置关联逻辑！')
                    }else{
                        $('#tabs').show();
                        $('#tabcont').hide();
                        $('#choose').html('');
                        $('#titcon').html(currentEle.find('p').eq(0).find('.question-show-title').text());
                        $('#selcets').html('<option value="-1">请选择关联选项</option>');
                        for(opnum=0;opnum<=liDeta.length-1;opnum++){
                            if($($(liorder)[opnum]).attr('type')!=3 && $($(liorder)[opnum]).attr('type')!=4){
                                option=$(liorder[opnum]).find('p:eq(0)').text();
                                mod='<option value="'+opnum+'">'+option+'</option>';
                                $('#selcets').attr('data_num',num);
                                $('#selcets').append(mod);
                            }
                        }
                    }
                }else{
                    $(this).next().html('<b>关联逻辑</b>当前面题目选中某些选项时才出现此题')
                    $(this).next().removeClass('addtab')
                }

        });
        $('#selcets').live('change',function(liDeta){
            var  selval=$('#selcets').val(),
                 liDeta=$('.question-show li'),
                 answer=$('.question-show li').find('.questiontext'),
                 tabcon='',
                 tabarr='',
                 tablist='',
                 valnum='';
            if(answer.length==0){
                alert('你还没有编辑关联选项~编辑后再来操作吧！');
                $(this).parents('#tabs').hide();
            }else if(selval==-1){
                $('#tabcont').hide();
            }else{
                $('#tabcont').show();
                $('#choose').show().html('');
                    tabarr=liDeta.eq(selval).find('.questiontext');
                    for(var tnum=0;tnum<=tabarr.length-1;tnum++){
                        tablist=tabarr.eq(tnum).text();
                        valnum=tnum+1;
                        tabcon='<p><input type="checkbox" name="a1" value=" '+valnum+'">'+tablist+'</p>';
                        $(tabcon).appendTo($('#choose'));
                    }
            };
        })
        $('#submit').click(function(){

            var selval=$('#selcets').val(),
                index=$('#selcets').attr('data_num'),
                liDeta=$('.question-show li'),
                seltit=parseFloat(selval)+ 1,
                tabs='',
                choose=$('#choose').find('input'),
                cc = 0,
                pnum='',
                linum='',
                val='';
                if(selval!='-1'){
                    for (pnum = 0; pnum < choose.length; pnum++) {
                        if (choose[pnum].checked) {
                            if (cc > 0){
                                val += ":"+choose[pnum].value;
                            }else{
                                val += choose[pnum].value;
                            }
                            cc++;
                        }

                       // item.data('');
                        var addtabs=liDeta.eq(index).find('.ass');
                        addtabs.next().html('<a>依赖于第<i>'+seltit+'</i>题的第<b>'+val+'</b>个选项</a>');
                        addtabs.next().addClass('addtab')
                        //addtabs.html('<a>依赖于第<i>'+seltit+'</i>题的第<b>'+val+'</b>个选项</a>');

                    }
                };
                if(!val){
                    //alert("请选择选项");
                    $('#tabs').hide();
                    liDeta.eq(index).find('.ass').attr('checked',false);
                    return
                }
            $('#tabs').hide();
        });
    $('.addtab a').live('click',function(){
        var allli=$('.question-show li'),
            liDeta=$(this).parents('li').prevAll(),
            currentEle=$(this).parents('li'),
            liorder=liDeta.get().reverse(),
            tabcon='',
            tabarr='',
            valnum='',
            opnum='',
            option='',
            mod='',
            title=parseFloat($(this).find('i').text())-1,
            num=$(this).parents('li').index(),
            tablist=$(this).find('b').text(),
            tabArr=tablist.split(':');

            $('#tabs').show();
            $('#tabcont').hide().find('#choose').html('');
            $('#titcon').html(currentEle.find('p').eq(0).find('.question-show-title').text());
            $('#selcets').html('<option value="-1">请选择关联选项</option>');
            for(opnum=0;opnum<=liDeta.length-1;opnum++){
                if(liDeta.eq(opnum).attr('type')!=3 && liDeta.eq(opnum).attr('type')!=4){
                    option=$(liorder[opnum]).find('p:eq(0)').text();
                    mod='<option value="'+opnum+'">'+option+'</option>';
                    $('#selcets').attr('data_num',num);
                    $('#selcets').append(mod);
                }
            };
            for(valnum=0;valnum<=$('#selcets option').length-1;valnum++){
                if($('#selcets option')[valnum].value==title){
                    $($('#selcets option')[valnum]).attr("selected",true);
                }
            };
            $('#tabcont').show();
            $('#choose').show();
            tabarr=allli.eq(title).find('.questiontext');
            for(var tnum=0;tnum<=tabarr.length-1;tnum++){
                tablist=tabarr.eq(tnum).text();
                valnum=tnum+1;
                tabcon='<p><input type="checkbox" name="a1" value=" '+valnum+'">'+tablist+'</p>';
                $(tabcon).appendTo($('#choose'));
            }
            for(var i=0;i<=tabArr.length;i++){
                var arrnum=parseInt(tabArr[i])
                for(var j=0;j<=$('#choose p').length;j++){
                    var pval=$($('#choose p')[j]).find('input');
                    var valnum=parseInt(pval.val());
                    if(valnum==arrnum){
                        pval.attr('checked','checked');
                    }

                }
            }

        $('#tabs').show();

    });
    $('#close').click(function(){
        $(this).parent().hide();
    });
    //单选题 && 多选题 插入操作
	$('.multiple-after').live('click',function(){
		if($(this).hasClass('optionality-after')){
			var html =  '<tr questionnaire_problem_item_id="0">'+
							'<td><input type="text"></td>'+
							'<td>'+
								'<input name="radio" type="radio" style="margin-left:45%" class="radio">'+
								
							'</td>'+
							'<td style="text-align:center"><span class="multiple-after optionality-after" style="cursor:pointer">插入</span><span class="choice-delete" style="cursor:pointer">删除</span><span class="choice-up" style="cursor:pointer">上移</span><span class="choice-down" style="cursor:pointer">下移</span></td>'+
						'</tr>';			
		}else{
			var jump_checkbox = $(this).parents('.question-table').find('.jump_questions').attr('checked')?1:0,
			html_jump = ''
			if(jump_checkbox){
				html_jump='<input type="text">';	
			}
			var html =  '<tr questionnaire_problem_item_id="0">'+
							'<td><input type="text"></td>'+
							'<td>'+
								'<input name="radio" type="radio" style="margin-left:45%" class="radio">'+
								
							'</td>'+
							'<td class="jump">'+html_jump+'</td>'+
							'<td style="text-align:center"><span class="multiple-after" style="cursor:pointer">插入</span><span class="choice-delete" style="cursor:pointer">删除</span><span class="choice-up" style="cursor:pointer">上移</span><span class="choice-down" style="cursor:pointer">下移</span></td>'+
						'</tr>';		
		}
		
		var tr = $(this).parents('tr');
		$(html).insertAfter(tr);
		
		//多选题状态下修改select选项值
		if($(this).parents('li').prev('li').attr('type') == 2)
		{
			var parents = $(this).parents('li');
			var table_tr = parents.find('tr').length;
			for(var i = 0 ; i < parents.find('select').length;i++)
			{
				parents.find('select').eq(i).append('<option value="'+(table_tr-1)+'">--'+(table_tr-1)+'--</option>')
			}	
		}			
					
	});
	//排序题编辑操作
	$('.sorting-edit').live('click',function(){
        var mDiv=$(this).parent().parent().find('.question-edit');
        if(mDiv.length==0){
            var appto = $(this).parent('.question-show-install'),
                li = $(this).parents('.question-show-install').parent('li'),
                random='<input type="checkbox" id="rand" name="check" >选项随机',
                relation='<input type="checkbox" class="ass" style="margin-left: 20px;"><span><b>关联逻辑</b>当前面题目选中某些选项时才出现此题</span>';
            if(li.next('li').hasClass('question-edit')){
                return false;
            }
            var	li_arr = [],
                sort_title = '',
                sort_required = '',
                sort_jump = '',
                sort_randoms='',
                sort_relation='',
                sort_jump_number = '';

            if(typeof(li.attr('html')) != 'undefined'){
                li_arr = li.attr('html').split('%%%')[0].split('&');
                sort_randoms=li_arr[0].split('=')[1];
                sort_relation=li_arr[1].split('=')[1];
                sort_title = li_arr[5].split('=')[1];
                sort_required = (li_arr[6].split('=')[1] == 1) ? 'checked="checked"' : '';
                sort_jump = (li_arr[7].split('=')[1] == 0 )? '' : 'checked="checked"';
                if(sort_randoms==1){
                    random='<input type="checkbox" id="rand" name="check" checked="checked" >选项随机';
                }
                if(sort_jump == 'checked="checked"'){

                    sort_jump_number = li_arr[7].split('=')[1];
                }
                if(sort_relation!=0){
                    li.find('.ass').attr('checked','checked');
                    var tabtxt= 0,
                        tab='',
                        rearr=sort_relation.split(','),
                        tabarr=rearr[1].split(':');

                    for(var tabn=0;tabn<=tabarr.length-1;tabn++){

                        if(tabtxt>0){
                            tab+=':'+tabarr[tabn];
                        }else{
                            tab+=tabarr[tabn];
                        }
                        tabtxt++;
                        relation='<input type="checkbox" class="ass" style="margin-left: 20px;" checked="checked"><span class="addtab"><a>依赖于第<i>'+rearr[0]+'</i>题的第<b>'+tab+'</b>个选项</a></span>'

                    }

                }

            }
            var html = '<div class="question-edit">'+
                '<p class="question-show-answer question-show-title">题目标题<input type="text" value = "'+sort_title+'"></p>'+
                '<p class="question-show-answer">'+
                '<input  type="checkbox" checked="checked" '+sort_required+' class="is_required">必答题<input  type="checkbox" class="jump-checkbox" style="margin-left:20%" '+sort_jump+'>无条件跳题，填写此题后跳转到'+
                '<input type="text" class="jump-number"  value="'+sort_jump_number+'">题'+
                '</p>'+
                '<table class="question-table" border="1" cellpadding="0" cellspacing="0">'+
                '<tr>'+
                '<th width="50%">题目选项</th>'+
                '<th width="50%">操作</th>'+
                '</tr>'

            if(typeof(li.attr('html')) != 'undefined'){
                var li_answer = li.attr('html').split('%%%');
                for(var i = 1 ; i < li_answer.length ; i++)
                {
                    html+='<tr questionnaire_problem_item_id="'+li.find('.question-show-answer').eq(i-1).attr('questionnaire_problem_item_id')+'">'+
                    '<td><input type="text" value="'+li_answer[i].split('&')[0].split('=')[1]+'"></td>'+
                    '<td style="text-align:center"><span class="sorting-after" style="cursor:pointer">插入</span><span class="choice-delete" style="cursor:pointer">删除</span><span class="choice-up" style="cursor:pointer">上移</span><span class="choice-down" style="cursor:pointer">下移</span></td>'+
                    '</tr>'
                }
            }else{
                html+='<tr questionnaire_problem_item_id="0">'+
                '<td><input type="text"></td>'+
                '<td style="text-align:center"><span class="sorting-after" style="cursor:pointer">插入</span><span class="choice-delete" style="cursor:pointer">删除</span><span class="choice-up" style="cursor:pointer">上移</span><span class="choice-down" style="cursor:pointer">下移</span></td>'+
                '</tr>'+
                '<tr questionnaire_problem_item_id="0">'+
                '<td><input type="text"></td>'+
                '<td style="text-align:center"><span class="sorting-after" style="cursor:pointer">插入</span><span class="choice-delete" style="cursor:pointer">删除</span><span class="choice-up" style="cursor:pointer">上移</span><span class="choice-down" style="cursor:pointer">下移</span></td>'+
                '</tr>'+
                '<tr questionnaire_problem_item_id="0">'+
                '<td><input type="text"></td>'+
                '<td style="text-align:center"><span class="sorting-after" style="cursor:pointer">插入</span><span class="choice-delete" style="cursor:pointer">删除</span><span class="choice-up" style="cursor:pointer">上移</span><span class="choice-down" style="cursor:pointer">下移</span></td>'+
                '</tr>'+
                '<tr questionnaire_problem_item_id="0">'+
                '<td><input type="text"></td>'+
                '<td style="text-align:center"><span class="sorting-after" style="cursor:pointer">插入</span><span class="choice-delete" style="cursor:pointer">删除</span><span class="choice-up" style="cursor:pointer">上移</span><span class="choice-down" style="cursor:pointer">下移</span></td>'+
                '</tr>';
            }

            html+= '</table>' +
            '<div style="width: 90%; margin: 0 auto;">' +random +relation+'</div>'+
            '<div class="question-table-button question-table-finish question-table-sort">完成</div></div>';
            $(html).insertAfter(appto);
        }
	});
	//排序题插入操作
	$('.sorting-after').live('click',function(){
		var tr = $(this).parents('tr');
		var html_td = '<tr questionnaire_problem_item_id="0">'+
						'<td><input type="text"></td>'+
						'<td style="text-align:center"><span class="sorting-after" style="cursor:pointer">插入</span><span class="choice-delete" style="cursor:pointer">删除</span><span class="choice-up" style="cursor:pointer">上移</span><span class="choice-down" style="cursor:pointer">下移</span></td>'+
					'</tr>';
		$(html_td).insertAfter(tr);			
					
	});
	//填空题编辑操作
	$('.fill-blanks-edit').live('click',function() {
        var mDiv=$(this).parent().parent().find('.question-edit');
        if(mDiv.length==0){
        var appto = $(this).parent('.question-show-install'),
            li = $(this).parents('.question-show-install').parent('li'),
            random = '<input type="checkbox" id="rand" name="check" >选项随机',
            relation = '<input type="checkbox" class="ass" style="margin-left: 20px;"><span><b>关联逻辑</b>当前面题目选中某些选项时才出现此题</span>';

        if (li.next('li').hasClass('question-edit')) {
            return false;
        }
        var li_arr = [],
            fill_title = '',
            fill_required = '',
            fill_jump = '',
            fill_jump_number = '',
            fill_random = '',
            fill_relation = '';
        if (typeof(li.attr('html')) != 'undefined') {
            li_arr = li.attr('html').split('&');
            fill_random = li_arr[0].split('=')[1];
            fill_relation = li_arr[1].split('=')[1];
            fill_title = li_arr[5].split('=')[1];
            fill_required = (li_arr[6].split('=')[1] == 1) ? 'checked="checked"' : '';
            fill_jump = (li_arr[7].split('=')[1] == 0 ) ? '' : 'checked="checked"';
            if (fill_jump == 'checked="checked"') {
                fill_jump_number = li_arr[7].split('=')[1];
            }
            if (fill_random == 1) {
                random = '<input type="checkbox" id="rand" name="check" checked="checked" >选项随机'
            }
            if (fill_relation != 0) {
                li.find('.ass').attr('checked', 'checked');
                var tabtxt = 0,
                    tab = '',
                    rearr = fill_relation.split(','),
                    tabarr = rearr[1].split(':');

                for (var tabn = 0; tabn <= tabarr.length - 1; tabn++) {

                    if (tabtxt > 0) {
                        tab += ':' + tabarr[tabn];
                    } else {
                        tab += tabarr[tabn];
                    }
                    tabtxt++;
                    relation = '<input type="checkbox" class="ass" style="margin-left: 20px;" checked="checked"><span class="addtab"><a>依赖于第<i>' + rearr[0] + '</i>题的第<b>' + tab + '</b>个选项</a></span>'
                }

            }

        }
        var html = '<div class="question-edit">' +
            '<p class="question-show-answer question-show-title">题目标题<input type="text" value="' + fill_title + '"></p>' +
            '<p class="question-show-answer">' +
            '<input type="checkbox" checked="checked" class="is_required" ' + fill_required + '>必答题<input type="checkbox" style="margin-left:20%" class="jump-checkbox" ' + fill_jump + '>无条件跳题，填写此题后跳转到' +
            '<input type="text" class="jump-number" value="' + fill_jump_number + '">题' +
            '</p>' +
            '<div style="width: 97.4%; margin: 0 auto;">' + random + relation + '</div>' +
            '<div class="question-table-button question-table-finish question-table-fill">完成</div>' +
            '</div>';
        $(html).insertAfter(appto);
    }
	});
	//答题删除操作
	$('.choice-delete').live('click',function(){
		var parent = $(this).parents('table').find('tr');
		if(parent.length <=2)
		{
			alert('不允许全部删除题目选项！');
			return false;	
		}
		
		if(confirm('确定要删除该选项吗？')){
			
			//针对多选题select的修改
			
			if($(this).parents('li').prev('li').attr('type') == 2)
			{
				
				var parents = $(this).parents('li');
				var table_tr = parents.find('tr').length;
				
				for(var i = 0 ; i < parents.find('select').length;i++)
				{
					parents.find('select').eq(i).find('option:last').remove();
				}	
			}

            //判断是否是原有已经存在的数据
            if($(this).parents('tr').attr('questionnaire_problem_item_id') && $(this).parents('tr').attr('questionnaire_problem_item_id') != '0'){
                var  questionnaire_problem_item_id = $(this).parents('tr').attr('questionnaire_problem_item_id');
                $.post(
                    domain + 'questionnaire_del',
                    {
                        'questionnaire_problem_item_id':questionnaire_problem_item_id
                    },
                    function(e){
                        alert(e.msg)
                    },
                    "json"
                );
//                alert(questionnaire_problem_item_id);

            }
			$(this).parents('tr').remove();	
		}
		
	});
	//答题上移操作
	$('.choice-up').live('click',function(){
		
		var tr =  $(this).parents('tr'),
			index = $(this).parents('tr').index();
		if(index == 1)
		{
			alert('该项目已经在第一位了');		
		}else{
			var tr_prev = tr.prev('tr');
			tr.insertBefore(tr_prev);		
		}	
	});
	
	//答题下移操作
	$('.choice-down').live('click',function(){
		var tr =  $(this).parents('tr'),
			index = $(this).parents('tr').index(),
			last = 	$(this).parents('tr').parents('table').find('tr').length;
		if(index == (last - 1)){
			alert('该项目已经在最后一位了')	
		}else{
			var tr_last = tr.next('tr');
			tr.insertAfter(tr_last);			
		}	
	});
	//判断可填空
	$('.radios').live('click',function(){
        if($(this).attr('checked')=='checked'){
            var fill_checkbox = $(this).parents('tr').siblings('tr').find('.fill-checkbox');
            /*for(var i = 0 ; i < fill_checkbox.length ; i++)
            {
                fill_checkbox.eq(i).remove();
            }*/
            if($(this).siblings('.fill-checkbox').length == 0 ){

                var html = '<span class="fill-checkbox"><input name="" type="checkbox">必填</span>';
                $(html).appendTo($(this).parent('td'));
            }
        }else{
            $(this).attr('checked',false);
            $(this).parent('td').children().remove('.fill-checkbox');
        }


			
	});
	//判断是否显示答题跳题功能
	$('.jump_questions').live('click',function(){
		var jump = $(this).parents('tr').siblings('tr').find('.jump');
		if($(this).attr("checked") == 'checked'){
			//选中状态
			for(var i = 0 ; i < jump.length ; i++)
			{
				jump.eq(i).html('<input type="text">');	
			}
		}else{
			//没有选中
			for(var i = 0 ; i < jump.length ; i++)
			{
				jump.eq(i).html('');	
			}
		}
	})
	//删除操作
	$('.question-delete').live('click',function(){
		var li = $(this).parents('.question-show-install').parent('li');
		var li_next = li.next('li');
		if(confirm('确定要删除吗？')){
			li.remove();
			if(li_next.hasClass('question-edit')){
				li_next.remove();	
			}
            if(li.attr('questionnaire_problem_id') && li.attr('questionnaire_problem_id') !='0'){

                var questionnaire_problem_id = li.attr('questionnaire_problem_id');
                $.post(
                    domain + 'questionnaire_del',
                    {
                        'questionnaire_problem_id':questionnaire_problem_id
                    },
                    function(e){
                        alert(e.msg)
                    },
                    "json"
                );
//                alert(questionnaire_problem_id);
            }
			//重置所有顺序
			reset_sort();
		}	
	});
	
	//上移操作
	$('.question-up').live('click',function(){
		var li = $(this).parents('.question-show-install').parent('li'),
			length = li.find('.question-show-number').html(),
			li_prev = li.prev('li:not(.question-edit)');
		if(li.siblings('li').hasClass('question-edit')){
			alert('请先编辑完后在移动！')	
		}else if(length == 1){
			alert('该项目已经在第一位了');	
		}else{
			li.insertBefore(li_prev);		
			//重置所有顺序
			reset_sort();
		} 	
	});
	//下移操作
	$('.question-down').live('click',function(){
		var li = $(this).parents('.question-show-install').parent('li'),
			length = li.find('.question-show-number').html(),
			all_length = $('.question-show').children('li:not(.question-edit)').length,
			li_next = li.next('li:not(.question-edit)');
		if(li.siblings('li').hasClass('question-edit')){
			alert('请先编辑完后在移动！')		
		}	
		else if(length == all_length){
			alert('该项目已经在最后一位了');	
		}else{
			li.insertAfter(li_next);	
			//重置所有顺序
			reset_sort();
		} 	
	});
	
	//最前操作
	$('.question-top').live('click',function(){
		var li = $(this).parents('.question-show-install').parent('li'),
			length = li.find('.question-show-number').html();
		if(length == 1){
			alert('该项目已经在第一位了');	
		}else{
			var li_prev = li.siblings('li:not(.question-edit)').eq(0);
			li.insertBefore(li_prev);	
			//重置所有顺序
			reset_sort();
		} 	
	});
	
	//最后操作
	$('.question-bottom').live('click',function(){
		var li = $(this).parents('.question-show-install').parent('li'),
			length = li.find('.question-show-number').html(),
			all_length = $('.question-show').children('li:not(.question-edit)').length;
		if(length == all_length){
			alert('该项目已经在最后一位了');	
		}else{
			var li_next = li.siblings('li:not(.question-edit)').eq(parseInt(all_length)-2);
			li.insertAfter(li_next);	
			//重置所有顺序
			reset_sort();
		} 	
	});
	
	//单题完成按钮
	$('.question-table-finish').live('click',function(){
		var parent = $(this).parents('.question-edit'),
			title = parent.find('.question-show-title').find('input').val(),
			jump_number = parent.find('.jump-number'),
			parent_siblings =$(this).parents('li'),
			type = parent_siblings.attr('type'),
            questionnaire_problem_id=parent_siblings.attr('questionnaire_problem_id'),
			serial = parent_siblings.find('.question-show-number').html(),
			is_required = parent.find('.is_required'),
			jump = parent.find('.jump-checkbox'),
            randchecbox=parent.find('#rand'),
            ass=parent.find('.ass'),
            necess = '',
            random= 0,
            relation=0,
            is_show= 1,
            html = '';
		if(title == ''){
			alert('题目标题没有填写，无法保存题目！');
			return false;	
		}
		//判断必答题框是否有打钩
		is_required = is_required.attr("checked")?1:0;
        if(is_required == 1){
            necess = '<span class = "question_type_new_html">*</span> ';
        }
        //将必填题目的标示填入
        var question_type = parent_siblings.find('.question-show-type');
        if(question_type.find('.question_type_new_html')){

            question_type.find('.question_type_new_html').remove();
        }
       var  question_type_html = question_type.html();
        question_type.html(necess+question_type_html);

		//判断无条件跳题是否打钩及获取跳题数
		jump = jump.attr("checked")?1:0;
		if(jump){
			if(jump_number.length > 0 && jump_number.val() != '')
			{
				if(!/^[0-9]*$/.test(jump_number.val())){
					alert('填写的跳转题目必须为整数并且为非负数')	
					return false;
				}else{
					jump = 	jump_number.val();
				}	
			}else{
				jump = 0;	
			}		
		}
        //增加随机选项
        randchecbox=randchecbox.attr('checked')?1:0;
        if(randchecbox==1){
            random=1;
        }else{
            random=0
        }
        //关联逻辑

        var addtab=parent.find('.addtab'),
            display=addtab.css('display');
        if(!$(ass).attr('checked')){
            relation=0;
            is_show=1;
        }else{
            if(display!='none'){
                relation =addtab.find('i').text();
                relation +=","+addtab.find('b').text();
                is_show=0;
            }else{
                is_show=1;
            }
        }


		html='random='+random+'&relation='+relation+'&is_show='+is_show+'&problem_type='+type+'&serial='+serial+'&problem_content='+title+'&is_required='+is_required+'&jump='+jump+'&questionnaire_problem_id='+questionnaire_problem_id;
		
		//多选题增加最少选择项和最多选择项两个参数
		if($(this).hasClass('question-table-more'))
		{
			var least_item = parent.find('select').eq(0).val(),
				 most_item = parent.find('select').eq(1).val();
				 if(least_item > most_item){
					alert('至少项不允许大于至多项!')
					return false;	 
				 }
			html+='&least_item='+least_item+'&most_item='+most_item;	 		
		}
		//循环获取每个对应答案
		var question_table_tr = $(this).siblings('.question-table').find('tr');
		if($(this).hasClass('question-table-sort')){
			//排序题操作	
			var html_question = '', sort_number = 0;
			for(var i  = 1 ; i < question_table_tr.length ; i++)
			{
				var question_table_tr_td = question_table_tr.eq(i).find('td') , questionnaire_problem_item_id = question_table_tr_td.parent('tr').attr('questionnaire_problem_item_id');
				if(question_table_tr_td.eq(0).find('input').val() != ''){
					sort_number++;
					if(i == 1)
					{
						html_question+='value'+i+'='+question_table_tr_td.eq(0).find('input').val()+'&questionnaire_problem_item_id='+questionnaire_problem_item_id;
					}else{
						html_question+='%%%value'+i+'='+question_table_tr_td.eq(0).find('input').val()+'&questionnaire_problem_item_id='+questionnaire_problem_item_id;
					}
					
				}
			}
			if(sort_number < 3)
			{
				alert('排序题至少要有三个排序选项！');
				return false;	
			}
			html+="%%%"+html_question;
			
		}else if($(this).hasClass('question-table-fill')){
				
		}else{
			//单选题 && 多选题
			var select_number = 0;
			for(var i = 1 ; i < question_table_tr.length; i++){
				var question_table_tr_td = question_table_tr.eq(i).find('td');
				if(question_table_tr_td.eq(0).find('input').val() != '')
				{
					var html_question = '';
					select_number++;
					for(var j = 0; j <question_table_tr_td.length;j++){

						var question_table_tr_td_one = question_table_tr_td.eq(0).find('input').val(),
							 question_table_tr_td_tow = question_table_tr_td.eq(1).find('.radios').attr('checked')?1:0,
							 question_table_tr_td_three = question_table_tr_td.eq(1).find('.fill-checkbox').find('input').attr('checked')?1:0,
							 question_table_tr_td_four = (question_table_tr_td.eq(2).find('input').val()?question_table_tr_td.eq(2).find('input').val():0),
                             question_table_tr_td_five = question_table_tr_td.eq(2).parent('tr').attr('questionnaire_problem_item_id');
						if($(this).hasClass('question-table-more')){
							html_question = 'content_item='+question_table_tr_td_one+'&is_write='+question_table_tr_td_tow+'&is_write_required='+question_table_tr_td_three+'&questionnaire_problem_item_id='+question_table_tr_td_five;
						}else{
							html_question = 'content_item='+question_table_tr_td_one+'&is_write='+question_table_tr_td_tow+'&is_write_required='+question_table_tr_td_three+'&single_jump='+question_table_tr_td_four+'&questionnaire_problem_item_id='+question_table_tr_td_five;
						}
					}	
					html+="%%%"+html_question;
				}	
			}
			if(select_number < 2)
			{
				alert('选择题至少要有二个有效选项！');
				return false;	
			}		
		}
		//编辑框消失，将数据填入对应题目中
		parent.remove();
		parent_siblings.attr('html',html);
		parent_siblings.find('.question-show-answer').remove();
		var html_arr = html.split('%%%'),
			html_title = (html_arr[0].split('&'))[2].split('=')[1],
			question_show_install = parent_siblings.find('.question-show-install');
		parent_siblings.find('.question-show-title').html(title);

		if($(this).hasClass('question-table-sort')){
			//排序题内容填入操作
			//var html_sort = html_arr;
			for(var i = 1; i < html_arr.length; i++){
				var html_sort_value = html_arr[i].split('&')[0].split('=')[1],
                    questionnaire_problem_item_id = html_arr[i].split('&')[1].split('=')[1],
					html_sort_select = '<p class="question-show-answer questiontext" questionnaire_problem_item_id="'+questionnaire_problem_item_id+'">'+html_sort_value+'</p>';


				$(html_sort_select).insertBefore(question_show_install);
			}
			
		}else{
			//单选题 && 多选题内容填入操作
			for(var i = 1 ; i < html_arr.length; i++){
				var html_option = html_arr[i].split('&')[0].split('=')[1],
					html_fill=html_arr[i].split('&')[1].split('=')[1],
					html_required=html_arr[i].split('&')[2].split('=')[1],
                    questionnaire_problem_item_id=0;
                    if(html_arr[i].split('&').length > 4){

                        questionnaire_problem_item_id=html_arr[i].split('&')[4].split('=')[1];
                    }else{

                        questionnaire_problem_item_id=html_arr[i].split('&')[3].split('=')[1] ;
                   }
					html_select = '<p class="question-show-answer questiontext" questionnaire_problem_item_id="'+questionnaire_problem_item_id+'">'+html_option;
					if(html_fill == 1)
					{
						html_select+='<span style="margin-left:10px;">________________</span>';	
						if(html_required == 1)
						{
							html_select+='<span style="color:#ff5375">*</span>';	
						}
					}
					html_select+='</p>';
					
				$(html_select).insertBefore(question_show_install);
			}
		}
		
		
			
	});

	//变换题目框描边色
	$('.question-show').find('li').live('click',function(){
		$(this).css('border-color','#ccc');
	});
	//提交答卷
	$('#question-send').bind('click',function(){
		
		var arr_option = [];
		
		//还有编辑框的状态下
		if($('.question-edit').length > 0)
		{
			alert('您还有题目没有编辑完成，请先编辑完成！');
			return false;	
		}
		
		//首先判断顶部基本信息录入情况
		var send = $('.send'),
			require = $('.require'),
			number = $('.number'),
			arr = [],
			html = '',
			arr_num = [];
		
		//判断必填项是否都已经填写	
		for(var i = 0 ; i <require.length ; i++)
		{
			if(require.eq(i).val() == '' || require.eq(i).val() == 0)
			{
				arr.push(i);	
			}	
		}
		//判断需要填入数字类型
		for(var i = 0 ; i <number.length ; i++)
		{
			if(!/^[0-9]*$/.test(number.eq(i).val()))
			{
				
				arr_num.push(i);	
			}
				
		}
		if(arr.length > 0)
		{
			for(var i = 0 ; i < arr.length ; i++)
			{
				require.eq(arr[i]).css('border-color','#ff5375');	
			}
			require.eq(arr[0]).ScrollTo(800);		
		}else if(arr_num.length > 0){
			for(var i = 0 ; i < arr_num.length ; i++)
			{
				number.eq(arr_num[i]).css('border-color','#ff5375');	
			}
			alert('填入的必须是数字类型');
			number.eq(arr_num[0]).ScrollTo(800);			
		}else{
			for(var i = 0 ; i < send.length ; i++)
			{
				html+=send.eq(i).attr('name')+'='+send.eq(i).val()+'&';	
			}
            var questionnaire_id = $('#questionnaire_id').val();
            html+='questionnaire_id='+questionnaire_id;
			//html = html.substring(0,html.length-1);
			arr_option.push(html);
//            alert(html)
		}	
		
		
		//判断每道题目是否都有填写
		var question_show_children = $('.question-show').children('li'),
			question_arr = [];
		for(var i = 0 ; i < question_show_children.length ; i++)
		{
			if(typeof(question_show_children.eq(i).attr('html')) == 'undefined' )	{
				
				question_show_children.eq(i).css('border-color','#ff5375');
				question_arr.push(i);	
			}
		}
		if(question_arr.length > 0)
		{
			question_show_children.eq(question_arr[0]).ScrollTo(800);
				
		}else{
			for(var i = 0 ; i < question_show_children.length ; i++)
			{
				//重置排序顺序
				var old_html =question_show_children.eq(i).attr('html'), 
					 new_serial = 'serial='+(i+1)+'&problem',
					 new_html = old_html.replace(/serial=(.*)&problem/,new_serial);
				question_show_children.eq(i).attr('html' , new_html);
				arr_option.push(question_show_children.eq(i).attr('html'));
			}
			if(arr_option.length > 0)
			{
				//执行数据ajax操作
				/*for(var i = 0 ; i <arr_option.length ; i++)
				{
					alert(arr_option[i])	
				}	*/	
				/* $.ajax({
					type:'POST',
					url:'xxx.com',
					dataType:'json',
					data:arr_option,
					success: function(){
						
					}	
				})  */
                if ($('#is_send').val() == 1 && $('#num_send').val() < 1) {
                    alert('奖励柚币的数目必须大于0');
                }else{
                    $.post(
                        domain + 'questionnaire_edit',
                        {
                            'data':arr_option
                        },
                        function(e){
                            alert(e.msg)
                            location.href = domain + 'questionnaire_list';
                        },
                        "json"
                    );
                }
			}
			
		}
		
		
	});
	//重置排序
	function reset_sort(){
		var question_show = $('.question-show').children('li:not(.question-edit)');
		for(var i = 0 ; i < question_show.length ; i++)
		{
			question_show.eq(i).find('.question-show-number').html(i+1);
			
		}	
	}
	
})