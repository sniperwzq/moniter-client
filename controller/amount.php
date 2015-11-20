<?php
namespace controller;

use core\Auth;
use model\Time_statistics;

class amount_C extends Auth{
	
	/**
	 * [hour 时报]
	 * @author wangzhiqiang
	 * @DateTime 2015-10-19T10:35:35+0800
	 * @return   [type]
	 */
	public function hour(){
		$time_statistics_db = new Time_statistics();
		$detail = false;
		if($_GET){
			$search_time = empty($_GET['search_time'])?strtotime(date('Y-m-d H').':00:00'):strtotime($_GET['search_time'].':00:00');
			if (isset($_GET['search_dmain']) && !empty($_GET['search_dmain'])) {
				$search_dmain = trim($_GET['search_dmain']);
				$logs = $time_statistics_db->get_hour_detail($search_dmain,$search_time);
				$detail = true;
			}else{
				$logs = $time_statistics_db->get_hour_report($search_time);
			}
			
		}else{
			$logs = $time_statistics_db->get_hour_report();
		}

		$search_time = empty($_GET['search_time']) ? date('Y-m-d H') : $_GET['search_time'];
		$this->assign('search_time',$search_time);

		$this->assign('detail',$detail);
		$this->assign('logs',$logs);
		$this->assign('json_logs',json_encode($logs));

	}

	
	/**
	 * [day 日报]
	 * @author wangzhiqiang
	 * @DateTime 2015-10-19T10:36:02+0800
	 * @return   [type]
	 */
	public function day(){
		$time_statistics_db = new Time_statistics();
		$detail = false;
		if($_GET){
			$search_time = empty($_GET['search_time']) ? strtotime(date('Y-m-d')) : strtotime($_GET['search_time']);
			
			if (isset($_GET['search_dmain']) && !empty($_GET['search_dmain'])) {
				$search_dmain = trim($_GET['search_dmain']);
				$logs = $time_statistics_db->get_day_detail($search_dmain,$search_time);
				$detail = true;
			}else{
				$logs = $time_statistics_db->get_day_report($search_time);
			}
		}else{
			$logs = $time_statistics_db->get_day_report();
		}

		$search_time = empty($_GET['search_time']) ? date('Y-m-d') : $_GET['search_time'];
		$this->assign('search_time',$search_time);

		$this->assign('detail',$detail);
		$this->assign('logs',$logs);
		$this->assign('json_logs',json_encode($logs));
	}

	
	/**
	 * [week 周报]
	 * @author wangzhiqiang
	 * @DateTime 2015-10-19T10:36:25+0800
	 * @return   [type]
	 */
	public function week(){
		$time_statistics_db = new Time_statistics();
		if($_GET){
			if (empty($_GET['search_time'])) {
            	$search_time = strtotime('this week monday');
            }else{
            	$search_time = strtotime($_GET['search_time']);
            	$search_year = date('Y');
            	$search_week = date('W',$search_time);
            	$search_time = strtotime($search_year.'-W'.$search_week);
            }

            if (isset($_GET['search_dmain']) && !empty($_GET['search_dmain'])) {
            	$search_dmain = trim($_GET['search_dmain']);
            	$logs = $time_statistics_db->get_week_detail($search_dmain,$search_time);
            	$detail = true;
            }else{
            	$logs = $time_statistics_db->get_week_report($search_time);
            }
            
		}else{
			$logs = $time_statistics_db->get_week_report();
		}

		$search_time = empty($_GET['search_time']) ? date('Y-m-d') : $_GET['search_time'];
		$this->assign('search_time',$search_time);

		$this->assign('detail',$detail);
		$this->assign('logs',$logs);
		$this->assign('json_logs',json_encode($logs));
	}

	
	/**
	 * [month 月报]
	 * @author wangzhiqiang
	 * @DateTime 2015-10-19T10:36:40+0800
	 * @return   [type]
	 */
	public function month(){
		$time_statistics_db = new Time_statistics();
		$detail = false;

		if($_GET){
			if (empty($_GET['search_time'])) {
                $year = date('Y');
                $month = date('m');
                $month_start = $year.'-'.$month.'-01';
                $search_start = strtotime($month_start);
                $month_end = $year.'-'.($month + 1).'-01';
                $search_end = strtotime($month_end);
            }else{
                $year = date('Y',strtotime($_GET['search_time']));
                $month = date('m',strtotime($_GET['search_time']));
                $month_start = $year.'-'.$month.'-01';
                $search_start = strtotime($month_start);
                $month_end = $year.'-'.($month + 1).'-01';
                $search_end = strtotime($month_end);
            }

            if (isset($_GET['search_dmain']) && !empty($_GET['search_dmain'])) {
            	$search_dmain = trim($_GET['search_dmain']);
            	$logs = $time_statistics_db->get_month_detail($search_dmain,$search_start,$search_end);
            	$detail = true;
            }else{
            	$logs = $time_statistics_db->get_month_report($search_start,$search_end);
            }
            
		}else{
			$year = date('Y');
            $month = date('m');
            $month_start = $year.'-'.$month.'-01';
            $search_start = strtotime($month_start);
            $month_end = $year.'-'.($month + 1).'-01';
            $search_end = strtotime($month_end);
            $logs = $time_statistics_db->get_month_report($search_start,$search_end);
		}
		
		$search_time = empty($_GET['search_time']) ? date('Y-m') : $_GET['search_time'];
		$this->assign('search_time',$search_time);

		$this->assign('detail',$detail);
		$this->assign('logs',$logs);
		$this->assign('json_logs',json_encode($logs));
	}
}