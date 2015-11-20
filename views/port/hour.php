<?php include_once realpath(__DIR__.'/../head.php');?>
<div>
	<h4 class="page-header page-header-title pdbtm0">
		<p>接口日志 > 时报</p>
	</h4>
	<div class="page-header header">
		<form class="form-inline" role="form" method="get" id="fom" action="<?php echo $_url;?>port/hour">
			<input type="hidden" id="userinfo_hidden" name="__my" value="port/hour" />
			<table class="search_table">
				<tr>
					<td>时间：</td>
					<td>
						<input id="begin" name="search_time" class="form-control w150" type="text" value="<?php echo $search_time;?>" placeholder="日志时间" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH',errDealMode:1,maxDate:'%y-%M-%d %H'})" />
					</td>
					<td>接口：</td>
					<td>
						<div class="form-group">
						<input  name="search_inter" type="text" class="form-control w150" value="<?php echo $search_inter;?>" placeholder="接口"/>
					</div>
					</td>
					<td align="left">
						<button type="submit" class="pull-right right-btn">搜索</button>
					</td>
				</tr>
			</table>
		</form>
	</div>
	<?php if($detail):?>
		<div class="row" style="hight:300px;">
			<div class="col-md-4" id="container_num"></div>
			<div class="col-md-4" id="container_spend"></div>
			<div class="col-md-4" id="container_status"></div>
		</div>
		<script type="text/javascript">
		var logs = <?php echo $json_logs;?>;
		var xvalue = [];
		var ynum = [];
		var yspend = [];

		var sum = 0;
		var z200 = 0;
		var z201 = 0;
		var z202 = 0;
		var z204 = 0;
		var z303 = 0;
		var z404 = 0;
		var other = 0;


		for (var i in logs) {
			xvalue[i] = new Date(logs[i].log_time * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
			
			ynum[i] = logs[i].num;
			if (ynum[i] == 0) {
				yspend[i] = 0;
			}else{
				yspend[i] = Math.ceil(logs[i].spend/ynum[i]);
			};

			sum += logs[i].num;
			
			z200 += logs[i].z200;
			z201 += logs[i].z201;
			z202 += logs[i].z202;
			z204 += logs[i].z204;
			z303 += logs[i].z303;
			z404 += logs[i].z404;
			other += logs[i].other;
		};

		if (sum > 0) {
			z200 =  Math.round(z200/sum*100);
			z201 =  Math.round(z201/sum*100);
			z202 =  Math.round(z202/sum*100);
			z204 =  Math.round(z204/sum*100);
			z303 =  Math.round(z303/sum*100);
			z404 =  Math.round(z404/sum*100);
			other =  Math.round(other/sum*100);
		};
		var zstatus = [
			['200',z200],
			['201',z201],
			['202',z202],
			['204',z204],
			['303',z303],
			['404',z404],
			['other',other],
		];
		
		
		$('#container_num').highcharts({
			title: {
	            text: '请求数'
	        },
	        subtitle:{
	        	text: '美柚实时监控'
	        },
	        xAxis: {
                categories:xvalue
            },
            yAxis: {
                title: { text: 'Value' },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip:{
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br>'+ Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: '请求数',
                radius: 20,
                data:ynum
        	}],

		});

		$('#container_spend').highcharts({
			title: {
	            text: '平均响应时间'
	        },
	        subtitle:{
	        	text: '美柚实时监控'
	        },
	        xAxis: {
                categories:xvalue
            },
            yAxis: {
                title: { text: 'Value' },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip:{
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br>'+ Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: '平均响应时间',
                radius: 20,
                data:yspend
        	}],

		});
		
		$('#container_status').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            text: '响应状态分布'
	        },
	        tooltip: {
	    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    color: '#000000',
	                    connectorColor: '#000000',
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: '所占比例',
	            data: zstatus
	        }]
	    });
		</script>
		
	<?php endif;?>
	<table id="table" class="table table-bordered table-hover">
		<thead>
			<tr>
				<th>序号</th>
				<th>接口</th>
				<th>请求数</th>
				<th>平均响应时间</th>
				<th>200</th>
				<th>201</th>
				<th>202</th>
				<th>204</th>
				<th>303</th>
				<th>404</th>
				<th>other</th>
				<?php if($detail):?>
					<th>时间</th>
				<?php endif;?>
			</tr>
		</thead>
		<tbody>
			<?php if(is_array($logs)):?>
			<?php foreach ($logs as $key => $value) :?>
				<tr>
					<td><?php echo $key;?></td>
					<td class="inter_info" intername="<?php echo $value->interface;?>" style="cursor:pointer;"><?php echo $value->interface;?></td>
					<td><?php echo $value->num;?></td>
					<td><?php echo round($value->spend/$value->num);?></td>
					<td><?php echo $value->z200;?></td>
					<td><?php echo $value->z201;?></td>
					<td><?php echo $value->z202;?></td>
					<td><?php echo $value->z204;?></td>
					<td><?php echo $value->z303;?></td>
					<td><?php echo $value->z404;?></td>
					<td><?php echo $value->other;?></td>
					<?php if($detail):?>
						<td><?php echo date('Y-m-d H:i:s',$value->log_time);?></td>
					<?php endif;?>
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
	$('.inter_info').live('click',function(){
		var search_inter = $(this).attr('intername');
		var search_time = "<?php echo $search_time;?>";
		var url = "<?php echo $_url;?>port/hour&search_time="+search_time+'&search_inter='+search_inter;

		window.location.href=url;
	});
</script>

</html>
