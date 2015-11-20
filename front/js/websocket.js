var chart;
var chart_spend;
var chart_method;
var chart_status;
var count = 0;
function streamStats() {

    var ws = new ReconnectingWebSocket("ws://211.151.98.92:9601");
    var lineCount;
    var colHeadings;

    ws.onopen = function() {
        console.log('connect');
        lineCount = 0;
    };

    ws.onclose = function() {
        console.log('disconnect');
    };

    ws.onmessage = function(e) {
        var data = jQuery.parseJSON(e.data.trim());
        data = data.real_statistics;
        var series = chart.series[0];
        var series_spend = chart_spend.series[0];
        //var series_method = chart_method.series;
        var series_status = chart_status.series;
        var average;
        if(data.count == 0){
            average = 0;
        }else{
            average = Math.ceil(data.spend/data.count);
        }
        
        if(count < 10){
            count++;
            series.addPoint([data.time, data.count], true, false);

            series_spend.addPoint([data.time, average], true, false);

            /*series_method[0].addPoint([data.time, data.get], true, false);
            series_method[1].addPoint([data.time, data.post], true, false);
            series_method[2].addPoint([data.time, data.options], true, false);
            series_method[3].addPoint([data.time, data.head], true, false);
            series_method[4].addPoint([data.time, data.put], true, false);
            series_method[5].addPoint([data.time, data.delete], true, false);
            series_method[6].addPoint([data.time, data.trace], true, false);*/

            series_status[0].addPoint([data.time, data.z200], true, false);
            series_status[1].addPoint([data.time, data.z201], true, false);
            series_status[2].addPoint([data.time, data.z202], true, false);
            series_status[3].addPoint([data.time, data.z204], true, false);
            series_status[4].addPoint([data.time, data.z303], true, false);
            series_status[5].addPoint([data.time, data.z404], true, false);
            series_status[6].addPoint([data.time, data.other], true, false);
        }else{
            series.addPoint([data.time, data.count], true, true);

            series_spend.addPoint([data.time, average], true, true);

            /*series_method[0].addPoint([data.time, data.get], true, true);
            series_method[1].addPoint([data.time, data.post], true, true);
            series_method[2].addPoint([data.time, data.options], true, true);
            series_method[3].addPoint([data.time, data.head], true, true);
            series_method[4].addPoint([data.time, data.put], true, true);
            series_method[5].addPoint([data.time, data.delete], true, true);
            series_method[6].addPoint([data.time, data.trace], true, true);*/

            series_status[0].addPoint([data.time, data.z200], true, true);
            series_status[1].addPoint([data.time, data.z201], true, true);
            series_status[2].addPoint([data.time, data.z202], true, true);
            series_status[3].addPoint([data.time, data.z204], true, true);
            series_status[4].addPoint([data.time, data.z303], true, true);
            series_status[5].addPoint([data.time, data.z404], true, true);
            series_status[6].addPoint([data.time, data.other], true, true);
        }
    };
}


function initCharts(){
    $(document).ready(function() { 
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        //var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE 
                marginRight: 10,
            },
            title: {
                text: '实时请求统计'
            },
            xAxis: {
                categories:[]
            },
            yAxis: {
                title: { text: 'Value' },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip:
                {
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
            }]
        });   

        chart_spend = new Highcharts.Chart({
            chart: {
                renderTo: 'container_spend',
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE 
                marginRight: 10,
            },
            title: {
                text: '实时响应耗时统计'
            },
            xAxis: {
                categories:[]
            },
            yAxis: {
                title: { text: 'Value' },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip:
                {
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
                name: '平均耗时',
                radius: 20,
            }]
        });

        /*chart_method = new Highcharts.Chart({
            chart: {
                renderTo: 'container_method',
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE 
                marginRight: 10,
            },
            title: {
                text: '响应方式'
            },
            xAxis: {
                categories:[]
            },
            yAxis: {
                title: { text: 'Value' },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip:
                {
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
                name: 'GET',
                radius: 20,
            },{
                name: 'POST',
                radius: 20,
            },{
                name: 'OPTIONS',
                radius: 20,
            },{
                name: 'HEAD',
                radius: 20,
            },{
                name: 'PUT',
                radius: 20,
            },{
                name: 'DELETE',
                radius: 20,
            },{
                name: 'TRACE',
                radius: 20,
            }]
        });*/

        chart_status = new Highcharts.Chart({
            chart: {
                renderTo: 'container_status',
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE 
                marginRight: 10,
            },
            title: {
                text: '响应状态'
            },
            xAxis: {
                categories:[]
            },
            yAxis: {
                title: { text: 'Value' },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip:
                {
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
                name: '200',
                radius: 20,
            },{
                name: '201',
                radius: 20,
            },{
                name: '202',
                radius: 20,
            },{
                name: '204',
                radius: 20,
            },{
                name: '303',
                radius: 20,
            },{
                name: '404',
                radius: 20,
            },{
                name: 'other',
                radius: 20,
            }]
        });
    });
}


$(function() {
    initCharts();
    streamStats();
});