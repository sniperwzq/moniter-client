<?php

namespace model;

use library\MY_mysql;
use config\Config;

class Time_statistics{
	private static $mysql = null;

    public function __construct()
    {
        if (empty(self::$mysql)) {
            self::$mysql = new MY_mysql(Config::get_mysql_config());
        }

    }


    /**
     * [get_hour_report 时报]
     * @author wangzhiqiang
     * @DateTime 2015-11-04T10:35:19+0800
     * @param    [type] $param
     * @return   [type]
     */
    public function get_hour_report($param = null){
    	if (empty($param)) {
            $start_time = strtotime(date('Y-m-d H').':00:00');
        } else {
            $start_time = $param;
        }

        $end_time = $start_time + 3600;

        $start_time = date('Y-m-d H:i:s',$start_time);
        $end_time = date('Y-m-d H:i:s',$end_time);

        $sql = "select
                  dmain,
                  sum(count) as count,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from time_statistics
                where time>='{$start_time}'
                and time<'{$end_time}'
                group by dmain";
        //echo $sql;exit();
        $logs = self::$mysql->query($sql, 'all');
        /*if (is_array($logs) && $logs[0]->interface == null) {
            $logs = false;
        }*/
        return $logs;
    }


    /**
     * [get_hout_detail 域时报详情]
     * @author wangzhiqiang
     * @DateTime 2015-11-04T10:47:39+0800
     * @param    [type] $dmain
     * @param    [type] $param
     * @return   [type]
     */
    public function get_hour_detail($dmain,$param){
      $end_time = $param + 3600;

      $start_time = date('Y-m-d H:i:s',$param);
      $end_time = date('Y-m-d H:i:s',$end_time);

      $sql = "select
                *
              from time_statistics
              where dmain='{$dmain}'
              and time>='{$start_time}'
              and time<'{$end_time}'";
      //echo $sql;exit();
      $logs = self::$mysql->query($sql, 'all');
      /*if (is_array($logs) && $logs[0]->interface == null) {
          $logs = false;
      }*/
      return $logs;
    }


    /**
     * [get_day_report 日报]
     * @author wangzhiqiang
     * @DateTime 2015-11-04T10:48:19+0800
     * @param    [type] $param
     * @return   [type]
     */
    public function get_day_report($param = null)
    {
        if (empty($param)) {
            $start_time = strtotime(date('Y-m-d'));
        } else {
            $start_time = $param;
        }

        $end_time = $start_time + 3600 * 24;
        $start = date('Y-m-d H:i:s',$start_time);
        $end = date('Y-m-d H:i:s',$end_time);
        $sql = "select
              dmain,
              sum(count) as count,
              sum(spend) as spend,
              sum(z200) as z200,
              sum(z201) as z201,
              sum(z202) as z202,
              sum(z204) as z204,
              sum(z303) as z303,
              sum(z404) as z404,
              sum(other) as other
            from time_statistics
            where time>='{$start}'
            and time<'{$end}'
            group by dmain";

        //echo $sql;exit();
        $logs = self::$mysql->query($sql,'all');

        /*$logs = [];
        for ($i=1; $i <= 24; $i++) { 
            $end_time = $start_time + 3600;

            $start = date('Y-m-d H:i:s',$start_time);
            $end = date('Y-m-d H:i:s',$end_time);

            $sql = "select
                  dmain,
                  sum(count) as count,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from time_statistics
                where time>='{$start}'
                and time<'{$end}'
                group by dmain";

            //echo $sql;//exit();
            $log = self::$mysql->query($sql);

            if ($log) {
                $log->time = $start;
                $logs[] = $log;
            }

            $start_time += 3600;
        }*/
        return $logs;
    }


    /**
     * [get_day_detail 域日报详情]
     * @author wangzhiqiang
     * @DateTime 2015-11-04T10:49:48+0800
     * @param    [type] $dmain
     * @param    [type] $param
     * @return   [type]
     */
    public function get_day_detail($dmain,$param){
      $start_time = $param;
      $logs = [];
      for ($i=1; $i <= 24; $i++) { 
          $end_time = $start_time + 3600;

          $start = date('Y-m-d H:i:s',$start_time);
          $end = date('Y-m-d H:i:s',$end_time);

          $sql = "select
                sum(count) as count,
                sum(spend) as spend,
                sum(z200) as z200,
                sum(z201) as z201,
                sum(z202) as z202,
                sum(z204) as z204,
                sum(z303) as z303,
                sum(z404) as z404,
                sum(other) as other
              from time_statistics
              where dmain='{$dmain}'
              and time>='{$start}'
              and time<'{$end}'";

          //echo $sql;//exit();
          $log = self::$mysql->query($sql);

          if ($log) {
              $log->dmain = $dmain;
              $log->time = $start;
              $logs[] = $log;
          }

          $start_time += 3600;
      }
      return $logs;
    }


    /**
     * [get_week_report 周报]
     * @author wangzhiqiang
     * @DateTime 2015-11-04T10:59:21+0800
     * @param    [type] $param
     * @return   [type]
     */
    public function get_week_report($param = null){
    	if (empty($param)) {
          $start_time = strtotime('this week monday');
      } else {
          $start_time = $param;
      }

      $end_time = $start_time + 3600 * 24 * 7;

      $start = date('Y-m-d H:i:s',$start_time);
      $end = date('Y-m-d H:i:s',$end_time);

      $sql = "select
            dmain,
            sum(count) as count,
            sum(spend) as spend,
            sum(z200) as z200,
            sum(z201) as z201,
            sum(z202) as z202,
            sum(z204) as z204,
            sum(z303) as z303,
            sum(z404) as z404,
            sum(other) as other
          from time_statistics
          where time>='{$start}'
          and time<'{$end}'
          group by dmain";

      //echo $sql;exit();
      $logs = self::$mysql->query($sql,'all');

      /*$logs = [];
      for ($i=1; $i <= 7; $i++) { 
          $end_time = $start_time + 3600 * 24;

          $start = date('Y-m-d H:i:s',$start_time);
          $end = date('Y-m-d H:i:s',$end_time);

          $sql = "select
                dmain,
                sum(count) as count,
                sum(spend) as spend,
                sum(z200) as z200,
                sum(z201) as z201,
                sum(z202) as z202,
                sum(z204) as z204,
                sum(z303) as z303,
                sum(z404) as z404,
                sum(other) as other
              from time_statistics
              where time>='{$start}'
              and time<'{$end}'
              group by dmain";

          //echo $sql;//exit();
          $log = self::$mysql->query($sql);

          if ($log) {
              $log->time = $start;
              $logs[] = $log;
          }

          $start_time += 3600 * 24;
      }*/
      
      return $logs;
    }

    /**
     * [get_month_detail 域周报详情]
     * @author wangzhiqiang
     * @DateTime 2015-11-04T11:04:06+0800
     * @param    [type] $dmain
     * @param    [type] $param
     * @return   [type]
     */
    public function get_week_detail($dmain,$param){
      $start_time = $param;
      $logs = [];
      for ($i=1; $i <= 7; $i++) { 
        $end_time = $start_time + 3600 * 24;

        $start = date('Y-m-d H:i:s',$start_time);
        $end = date('Y-m-d H:i:s',$end_time);

        $sql = "select
              sum(count) as count,
              sum(spend) as spend,
              sum(z200) as z200,
              sum(z201) as z201,
              sum(z202) as z202,
              sum(z204) as z204,
              sum(z303) as z303,
              sum(z404) as z404,
              sum(other) as other
            from time_statistics
            where dmain='{$dmain}'
            and time>='{$start}'
            and time<'{$end}'";

        //echo $sql;//exit();
        $log = self::$mysql->query($sql);

        if ($log) {
            $log->dmain = $dmain;
            $log->time = $start;
            $logs[] = $log;
        }

        $start_time += 3600 * 24;
      }
      
      return $logs;
    }

    
    /**
     * [get_month_report 月报]
     * @author wangzhiqiang
     * @DateTime 2015-11-04T11:13:21+0800
     * @param    [type] $start
     * @param    [type] $end
     * @return   [type]
     */
    public function get_month_report($start,$end){
    	$start_date = date('Y-m-d H:i:s',$start);
      $end_date = date('Y-m-d H:i:s',$end);

      $sql = "select
            dmain,
            sum(count) as count,
            sum(spend) as spend,
            sum(z200) as z200,
            sum(z201) as z201,
            sum(z202) as z202,
            sum(z204) as z204,
            sum(z303) as z303,
            sum(z404) as z404,
            sum(other) as other
          from time_statistics
          where time>='{$start_date}'
          and time<'{$end_date}'
          group by dmain";

      //echo $sql;//exit();
      $logs = self::$mysql->query($sql,'all');

      /*$logs = [];
        for ($i=1; $i <= 4; $i++) { 
            if ($i != 4) {
                $end_time = $start + 3600 * 24 * 7;
            }else{
                $end_time = $end;
            }
            
            $start_date = date('Y-m-d H:i:s',$start);
            $end_date = date('Y-m-d H:i:s',$end_time);

            $sql = "select
                  dmain,
                  sum(count) as count,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from time_statistics
                where time>='{$start_date}'
                and time<'{$end_date}'
                group by dmain";

            //echo $sql;//exit();
            $log = self::$mysql->query($sql);

            if ($log) {
                $log->time = $start_date;
                $logs[] = $log;
            }

            $start += 3600 * 24 * 7;
            
        }*/
        
        return $logs;
    }


    /**
     * [get_month_detail 域月报详情]
     * @author wangzhiqiang
     * @DateTime 2015-11-04T11:08:37+0800
     * @param    [type] $dmain
     * @param    [type] $start
     * @param    [type] $end
     * @return   [type]
     */
    public function get_month_detail($dmain,$start,$end){
      $logs = [];
      for ($i=1; $i <= 4; $i++) { 
        if ($i != 4) {
            $end_time = $start + 3600 * 24 * 7;
        }else{
            $end_time = $end;
        }
        
        $start_date = date('Y-m-d H:i:s',$start);
        $end_date = date('Y-m-d H:i:s',$end_time);

        $sql = "select
              sum(count) as count,
              sum(spend) as spend,
              sum(z200) as z200,
              sum(z201) as z201,
              sum(z202) as z202,
              sum(z204) as z204,
              sum(z303) as z303,
              sum(z404) as z404,
              sum(other) as other
            from time_statistics
            where dmain='{$dmain}'
            and time>='{$start_date}'
            and time<'{$end_date}'";

        //echo $sql;//exit();
        $log = self::$mysql->query($sql);

        if ($log) {
            $log->dmain = $dmain;
            $log->time = $start_date;
            $logs[] = $log;
        }

        $start += 3600 * 24 * 7;
          
      }
      
      return $logs;
    }
}