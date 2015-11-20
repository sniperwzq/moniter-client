<?php include_once realpath(__DIR__.'/../head.php');?>
<div>
	<h4 class="page-header page-header-title pdbtm0">
		<p>监控设置 > 设置监控域</p>
	</h4>
	<div class="page-header header">
		<form class="form-inline" role="form" method="post" id="fom" action="<?php echo $_url;?>setmoniter/setdmain">
			<table class="search_table">
				<tr>
					<td>监控域名：</td>
					<td>
						<input id="add_dmain" name="add_dmain" class="form-control w150" type="text" />
					</td>
					
					<td align="left">
						<button type="submit" class="pull-right right-btn">添加</button>
					</td>
				</tr>
			</table>
		</form>
	</div>
	<table id="table" class="table table-bordered table-hover">
		<thead>
			<tr>
				<th>序号</th>
				<th>域名</th>
				<th>编辑时间</th>
				<th>状态</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody>
			<?php if(is_array($list)):?>
			<?php foreach($list as $k=>$v):?>
				<tr>
					<td><?php echo $k;?></td>
					<td><?php echo $v->dmain;?></td>
					<td><?php echo $v->update_time;?></td>
					<td><?php echo $v->status;?></td>
					<td>
						
						<?php if($v->status == 0):?>
							<input type="button" class="open_moniter" dmain="<?php echo $v->dmain;?>" dmainid="<?php echo $v->id;?>" value='开启' />
						<?php elseif($v->status == 1):?>
							<input type="button" class="close_moniter" dmain="<?php echo $v->dmain;?>" dmainid="<?php echo $v->id;?>" value='关闭' />
						<?php endif;?>
						<input type="button" class="delete_moniter" dmainid="<?php echo $v->id;?>" value='删除' />
					</td>
				</tr>
			<?php endforeach;?>
			<?php endif;?>
		</tbody>
	</table>
</div>
</div>
</div>
</body>
<script type="text/javascript">
	$('.open_moniter').live('click',function(){
		var dmainid = $(this).attr('dmainid');
		var dmain = $(this).attr('dmain');
		var url = "<?php echo $_url;?>setmoniter/open_moniter";
		var backurl = "<?php echo $_url;?>setmoniter/setdmain";
		//alert(dmain);

		$.post(url,{dmainid: dmainid,dmain: dmain},function(data){
			if (data) {
				alert('开启成功');
				window.location.href=backurl;
			}else{
				alert('开启失败');
			}
		});
	});


	$('.close_moniter').live('click',function(){
		var dmainid = $(this).attr('dmainid');
		var dmain = $(this).attr('dmain');
		var url = "<?php echo $_url;?>setmoniter/close_moniter";
		var backurl = "<?php echo $_url;?>setmoniter/setdmain";
		//alert(dmain);

		$.post(url,{dmainid: dmainid,dmain: dmain},function(data){
			if (data) {
				alert('关闭成功');
				window.location.href=backurl;
			}else{
				alert('关闭失败');
			}
		});
	});


	$('.delete_moniter').live('click',function(){
		var dmainid = $(this).attr('dmainid');
		
		var url = "<?php echo $_url;?>setmoniter/delete_moniter";
		var backurl = "<?php echo $_url;?>setmoniter/setdmain";
		$.post(url,{dmainid: dmainid},function(data){
			if (data) {
				alert('删除成功');
				window.location.href=backurl;
			}else{
				alert('删除失败');
			}
		});
	});


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
</script>
</html>