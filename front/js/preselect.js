/*
 *ProSelect 1.0
 *@author linan
 *Depends:
 *jQuery,modules
 */
;(function($){
  var datePickerArray = {
    startDay : $('.dateselect .start').text().replace(/\./g,'-'),
    endDay : $('.dateselect .end').text().replace(/\./g,'-')
  };
  var date = new Date();
  window.thisYear = date.getFullYear();
  $.fn.ProSelect = function(options){
    if(this.length >0){
      var $this = this;
      var date = new Date();     
      var ed = Date.parse(date);
      var sd = date.setMonth((date.getMonth() - 6));  
      var diff = (ed - sd)/(24 * 60 * 60 * 1000);      
      
      var defaults = {
        show : false,
        x : $this,
        targettext : $this.text(),
        muti : false,
        temp : '<div id ="proTemp">test</div>',
        tempid : 'proTemp',        
        inputname : ['昨天','今天','过去7天','过去30天','过去90天','过去6月'],
        inputval : ['1','-1','-7','-30','-90',-(Math.ceil(diff) + 1)],
        custom : true,
        callback : ''
      };
      if(options){
        var set = $.extend(false,{},defaults,options);
      }
      $this.set = set;
      init($this,set);
      $.extend($.fn.ProSelect.prototype,{  
    	alert : function(){console.log(set)},
        buildmodule : function(){
          if(set.temp){
            if(set.inputname.length == set.inputval.length){
              var _temp = '<div id ="'+ set.tempid +'"><ul>';
              for(i=0;i<set.inputname.length;i++){
                var val  = set.inputval[i] == '' ? 'custom' :  set.inputval[i];
                _temp += '<li set-value="'+ val +'">' + set.inputname[i] + '</li>'
              }
              _temp += '</ul></div>';
            }
          }
          return _temp;
        },
        bindclick : function($this){
          var $t = $this;
          $('#'+set.tempid).find('li').each(function(){
            $(this).live('click',function(){
              if($(this).attr('set-value')!=''){
                var n = parseInt($(this).attr('set-value'));                
                var days = (n < 0) ? $.GetDate(n) : $.GetDate(-n-1, 0);                
                $t.html('<span class="start">'+$.replaceDate(days[0])+'</span>' + ' - ' + '<span class="end">'+$.replaceDate(days[1])+'</span><b class="icon pulldown"></b>');
                $('#'+set.tempid).hide();                
                $t.set.callback(days[0], days[1], Math.abs(n));
              }else{
                $('#datepickerStart').show();
              }
              return false;
            })
          })
        },
        datepickerInit : function(){        	
          $("#datepickerStart").datepicker({
            dateFormat: "yy-mm-dd",
            inline: true,
            defaultDate:datePickerArray.startDay,
            minDate : set.minDate,
            maxDate : +0,
            yearRange: '2000:'+window.thisYear,
            onSelect: function(dateText, inst,e) {
              $("#datepickerEnd").datepicker('option','minDate',dateText);
              datePickerArray.startDay = dateText;              
              return false;
            }
          });
          $("#datepickerEnd").datepicker({
            dateFormat: "yy-mm-dd",
            inline: true,
            defaultDate:datePickerArray.endDay,
            maxDate : +0,
            yearRange: '2000:'+window.thisYear,
            onSelect: function(dateText, inst,e) {
              $("#datepickerStart").datepicker('option','maxDate',dateText);
              datePickerArray.endDay = dateText;
              return false;
            }
          });
        }
      })
      _setDefault(set);
      return $this;
    }
  };

  var init = function($this,op){
    $this.bind('click',function(){
      if(!$('#'+op.tempid).is(':visible')){       
        if(!$this.next().is('#'+op.tempid)){
          $this.after($this.ProSelect.prototype.buildmodule);
          _custom($this,op);
          $this.ProSelect.prototype.bindclick($this);
        }else{
          $('#'+op.tempid).show();
        }
      }else{
        $('#'+op.tempid).hide();
      }
      op.show = true;
      $('.ui-datepicker-calendar').live('click',function(e){
        e.stopPropagation();
      });
      $('.ui-datepicker-header').live('click',function(e){
        e.stopPropagation();
      })
      return false;
    })
  };
  function _custom($this,op){
    if(op.custom){
      var tmp = '<a class="customhref" href="#">自选</a><div id="datePickerPanel" style="display:none;"><div id="datepickerStart"></div><div id="datepickerEnd"></div><input type="button" value="确定" class="custombtn" style="clear:both;display:block"/></div>';
      $('#'+op.tempid).append(tmp);
      $('.customhref').bind('click',function(){
        $(this).next().show();
        $this.ProSelect.prototype.datepickerInit();
        return false;
      })
      $('.custombtn').bind('click',function(){ 
        $('#'+op.tempid).hide();
        $('#datePickerPanel').hide();
        op.show = false;       
        $this.find('.start').html($.replaceDate(datePickerArray.startDay));
        $this.find('.end').html($.replaceDate(datePickerArray.endDay));
        op.callback(datePickerArray.startDay,datePickerArray.endDay,$.GetDate(datePickerArray.startDay,datePickerArray.endDay));
        return false;
      })
    }
  };

  //fix ui click bubbling page
  var _setDefault = function(op){
    $(document).bind('click',function(e){
      if($(e.target).parents('table.ui-datepicker-calendar').length > 0 || $(e.target).parents('#datePickerPanel').length > 0 || $(e.target).parents('.ui-datepicker-header').length > 0){
        return false;
      }else{
        $('#'+op.tempid).hide();
        $('#datePickerPanel').hide();
        op.show = false;
      }
    })
  };
})(jQuery);

;(function($){
    $.extend($,{
        /*
        *GetDate or Days
        *version 1.1
        * fix ie bug ===> - to /
        *author linan
        *@params  null number example : GetDate() return today
        *@params number example : GetDate('-3') return array [3daysbefore,today]
        *@params stringdate example : GetDate('2012-12-23') or getDate('2012.12.23') return number, days from arg0 to today
        *@params two stringdate example : GetDate('2012-12-1','2012-12-23') return number, days from arg0 to arg1
        *@params two example : $.GetDate('2012-02-23',-30) return string "2012-01-25"
        */
        GetDate : function(d1,d2){
            var len = arguments.length;
            var reg = /\d{4}([-.\/])\d{1,2}\1\d{1,2}/;
            var dates = [];
            var day,number;
            var today = getToday();            
            switch(len){
            case 0 :
                return getToday();
                break;
            case 1:
                if(reg.test(arguments[0])){
                    return getDays(arguments[0],getToday());
                }else{
                    day = buildDate(arguments[0],today);
                    dates.push(day);
                    dates.push(getToday());
                    return dates;
                }
                break;
            case 2 :
                if(reg.test(arguments[0]) && reg.test(arguments[1])){
                    number = getDays(arguments[0].replace(/-/g,'/'),arguments[1].replace(/-/g,'/'));
                    return number;
                }
                else if(arguments[1] == 0){
                	day = buildDate(arguments[0],today);                    
                    return [day, day];
                }
                else{                	
                    day = buildDate(arguments[1],arguments[0]);                    
                    return day;
                }
                break;
            }
            function getDays(arg,day){
                var value = new Date(day) - new Date(arg.replace(/\b(\w)\b/g, '0$1'));
                if(value<0){
                    return "Wrong Date";
                }else{
                    return parseInt(value/(1000*3600*24)+1,10);
                }
            };
            function getToday(){
                var date = new Date();
                this.Day = date.getDate();
                this.Month = date.getMonth()+1;
                this.Year = date.getFullYear();
                return (this.Year.toString()+'-'+this.Month.toString()+'-'+this.Day.toString()).replace(/\b(\w)\b/g, '0$1');;
            };
            function buildDate(num,day){
                var n = num;
                if(typeof(n) == String){
                    parseInt(n,10);
                }
                if(n >= 0){
                    return getToday();
                }else{
                    var someDay = new Date(new Date(day.replace(/\-/g,'/'))-0+(n+1)*86400000); 
					
                    someDay = someDay.getFullYear() + "-" + (someDay.getMonth()+1) + "-" + someDay.getDate();
                    return someDay.replace(/\b(\w)\b/g, '0$1');
					
                }
            }
        },
        /*
        *replace Date '-' to '.'
        *@param date example :$.replaceDate('2012-01-01')
        *return 2012.01.01
        */
        replaceDate : function(mydate){
            return mydate.replace(/-/g,'.');
        }
    })
})(jQuery);

/*
*set datepicker default settings
*/
/*;(function($){
    $.datepicker.regional['zh-CN'] = {
      closeText: '关闭',      
      prevText: '',
      nextText: '',
      currentText: '',
      monthNames: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
      dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
      dayNamesMin: ['日','一','二','三','四','五','六'],
      dateFormat: 'yy-mm-dd',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: true,
      yearSuffix: ' .'};
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
})(jQuery);*/