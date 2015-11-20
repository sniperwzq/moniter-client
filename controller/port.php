<?php
/**
 * Created by PhpStorm.
 * Author: wangzhiqiang
 * Date: 2015/10/15
 * Time: 9:33
 */

namespace controller;
use core\Auth;
use model\Interface_logs;

class port_C extends Auth{

    /**
     * hour [时报]
     * @author wangzhiqiang
     */
    public function hour(){
        $interface_logs_db = new Interface_logs();
        $detail = false;
        if($_GET){
            //print_r(empty($_GET['search_time']));exit();
            $search_time = empty($_GET['search_time'])?strtotime(date('Y-m-d H').':00:00'):strtotime($_GET['search_time'].':00:00');
            //echo $search_time;exit();

            if(isset($_GET['search_inter']) && !empty($_GET['search_inter'])){
                $logs = $interface_logs_db->get_hour_detail($_GET['search_inter'],$search_time);
                $detail = true;
            }else{
                $logs = $interface_logs_db->get_hour_report($search_time);
            }
        }else{
            $logs = $interface_logs_db->get_hour_report();
        }

        $search_time = empty($_GET['search_time']) ? date('Y-m-d') : $_GET['search_time'];
        $this->assign('search_time',$search_time);

        $this->assign('detail',$detail);
        $this->assign('logs',$logs);
        $this->assign('json_logs',json_encode($logs));
        //var_dump($logs);exit();
    }


    /**
     * day [日报]
     * @author wangzhiqiang
     */
    public function day(){
        $interface_logs_db = new Interface_logs();
        $detail = false;
        if($_GET){
            $search_time = empty($_GET['search_time']) ? strtotime(date('Y-m-d')) : strtotime($_GET['search_time']);

            if(isset($_GET['search_inter']) && !empty($_GET['search_inter'])){
                $logs = $interface_logs_db->get_day_detail($_GET['search_inter'],$search_time);
                $detail = true;
            }else{
                $logs = $interface_logs_db->get_day_report($search_time);
            }
        }else{
            $logs = $interface_logs_db->get_day_report();
        }

        $search_time = empty($_GET['search_time']) ? date('Y-m-d') : $_GET['search_time'];
        $this->assign('search_time',$search_time);
        $this->assign('detail',$detail);
        $this->assign('logs',$logs);
        $this->assign('json_logs',json_encode($logs));
    }


    /**
     * week [周报]
     * @author wangzhiqiang
     */
    public function week(){
        $interface_logs_db = new Interface_logs();
        $detail = false;
        if($_GET){
            //print_r($_GET);exit();
            if (empty($_GET['search_time'])) {
                $search_time = strtotime('this week monday');
            }else{
                $search_time = strtotime($_GET['search_time']);
                $search_year = date('Y');
                $search_week = date('W',$search_time);
                $search_time = strtotime($search_year.'-W'.$search_week);
            }
            

            if(isset($_GET['search_inter']) && !empty($_GET['search_inter'])){
                $logs = $interface_logs_db->get_week_detail($_GET['search_inter'],$search_time);
                $detail = true;
            }else{
                $logs = $interface_logs_db->get_week_report($search_time);
            }
        }else{
            $logs = $interface_logs_db->get_week_report();
        }

        $week = date('W');

        $search_time = empty($_GET['search_time']) ? date('Y-m-d') : $_GET['search_time'];
        $this->assign('search_time',$search_time);

        $this->assign('week',$week);
        $this->assign('detail',$detail);
        $this->assign('logs',$logs);
        $this->assign('json_logs',json_encode($logs));
    }


    /**
     * month [月报]
     * @author wangzhiqiang
     */
    public function month(){
        $interface_logs_db = new Interface_logs();
        $detail = false;

        if ($_GET) {
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

            if (isset($_GET['search_inter']) && !empty($_GET['search_inter'])) {
                $logs = $interface_logs_db->get_month_detail($_GET['search_inter'],$search_start,$search_end);
                $detail = true;
            }else{
                $logs = $interface_logs_db->get_month_report($search_start,$search_end);
            }
        }else{
            $year = date('Y');
            $month = date('m');
            $month_start = $year.'-'.$month.'-01';
            $search_start = strtotime($month_start);
            $month_end = $year.'-'.($month + 1).'-01';
            $search_end = strtotime($month_end);
            $logs = $interface_logs_db->get_month_report($search_start,$search_end);
        }

        $search_time = empty($_GET['search_time']) ? date('Y-m-d') : $_GET['search_time'];
        $this->assign('search_time',$search_time);
        $this->assign('detail',$detail);
        $this->assign('logs',$logs);
        $this->assign('json_logs',json_encode($logs));
    }
}