<?php

namespace model;

use library\MY_mysql;
use config\Config;

class Interface_logs
{
    private static $mysql = null;

    public function __construct()
    {
        if (empty(self::$mysql)) {
            self::$mysql = new MY_mysql(Config::get_mysql_config());
        }

    }

    /**
     * get_hour_report [时报]
     * @author wangzhiqiang
     * @param null $param 时间戳
     * @return array|bool
     */
    public function get_hour_report($param = null)
    {
        if (empty($param)) {
            $start_time = strtotime(date('Y-m-d H').':00:00');
        } else {
            $start_time = $param;
        }

        $end_time = $start_time + 3600;

        $sql = "select
                  interface,
                  sum(num) as num,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from interface_logs
                where log_time>={$start_time}
                and log_time<={$end_time}
                group by interface";
        //echo $sql;exit();
        $logs = self::$mysql->query($sql, 'all');
        /*if (is_array($logs) && $logs[0]->interface == null) {
            $logs = false;
        }*/
        return $logs;
    }


    /**
     * [get_hour_detail 单接口时报详情]
     * @author wangzhiqiang
     * @DateTime 2015-10-17T12:53:50+0800
     * @param    [type] $inter
     * @param    [type] $param
     * @return   [type]
     */
    public function get_hour_detail($inter, $param = null)
    {
        if (empty($param)) {
            $start_time = strtotime(date('Y-m-d H').':00:00');
        } else {
            $start_time = $param;
        }

        $logs = [];
        for ($i=1; $i <= 6; $i++) { 
            $end_time = $start_time + 600;

            $sql = "select
                  interface,
                  sum(num) as num,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from interface_logs
                where interface='{$inter}' 
                and log_time>={$start_time}
                and log_time<{$end_time}
                group by interface";

            //echo $sql;//exit();
            $log = self::$mysql->query($sql);

            if ($log) {
                $log->log_time = $start_time;
                $logs[] = $log;
            }

            $start_time += 600;
        }
        return $logs;
    }


    /**
     * [get_day_report 日报]
     * @author wangzhiqiang
     * @DateTime 2015-10-17T12:55:18+0800
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

        $sql = "select
                  interface,
                  sum(num) as num,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from interface_logs
                where log_time>={$start_time}
                and log_time<={$end_time}
                group by interface";

        $log = self::$mysql->query($sql, 'all');
        return $log;
    }


    /**
     * [get_day_detail 接口日报详情]
     * @author wangzhiqiang
     * @DateTime 2015-10-17T12:59:29+0800
     * @param    [type] $inter
     * @param    [type] $param
     * @return   [type]
     */
    public function get_day_detail($inter, $param = null)
    {
        if (empty($param)) {
            $start_time = strtotime(date('Y-m-d'));
        } else {
            $start_time = $param;
        }

        //$sql = "select * from interface_logs where log_time>={$start_time} and log_time<={$end_time} and interface='{$inter}'";

        

        $logs = [];
        for ($i=1; $i <= 24; $i++) { 
            $end_time = $start_time + 3600;

            $sql = "select
                  interface,
                  sum(num) as num,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from interface_logs
                where interface='{$inter}' 
                and log_time>={$start_time}
                and log_time<{$end_time}
                group by interface";

            //echo $sql;//exit();
            $log = self::$mysql->query($sql);

            if ($log) {
                $log->log_time = $start_time;
                $logs[] = $log;
            }

            $start_time += 3600;
        }
        
        return $logs;
    }


    /**
     * [get_week_report 周报]
     * @author wangzhiqiang
     * @DateTime 2015-10-18T21:17:23+0800
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

        $sql = "select
                  interface,
                  sum(num) as num,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from interface_logs
                where log_time>={$start_time}
                and log_time<={$end_time}
                group by interface";

        //echo $sql;exit();
        $log = self::$mysql->query($sql, 'all');
        return $log;
    }


    /**
     * [get_week_detail 接口周报详情]
     * @author wangzhiqiang
     * @DateTime 2015-10-18T21:19:53+0800
     * @param    [type] $inter
     * @param    [type] $param
     * @return   [type]
     */
    public function get_week_detail($inter, $param = null){
        if (empty($param)) {
            $start_time = strtotime('this week monday');
        } else {
            $start_time = $param;
        }

        $logs = [];
        for ($i=1; $i <= 7; $i++) { 
            $end_time = $start_time + 3600 * 24;

            $sql = "select
                  interface,
                  sum(num) as num,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from interface_logs
                where interface='{$inter}' 
                and log_time>={$start_time}
                and log_time<{$end_time}
                group by interface";

            //echo $sql;//exit();
            $log = self::$mysql->query($sql);

            if ($log) {
                $log->log_time = $start_time;
                $logs[] = $log;
            }

            $start_time += 3600 * 24;
        }
        
        return $logs;
    }


    /**
     * [get_month_report 月报]
     * @author wangzhiqiang
     * @DateTime 2015-10-18T21:46:50+0800
     * @param    [type] $start
     * @param    [type] $sql
     * @return   [type]
     */
    public function get_month_report($start,$end){
        $sql = "select
                  interface,
                  sum(num) as num,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from interface_logs
                where log_time>={$start}
                and log_time<={$end}
                group by interface";

        $log = self::$mysql->query($sql, 'all');
        return $log;
    }


    /**
     * [get_month_detail 接口月报详情]
     * @author wangzhiqiang
     * @DateTime 2015-10-18T21:47:08+0800
     * @param    [type] $inter
     * @param    [type] $start
     * @param    [type] $end
     * @return   [type]
     */
    public function get_month_detail($inter,$start,$end){
        $logs = [];
        for ($i=1; $i <= 4; $i++) { 
            if ($i != 4) {
                $end_time = $start + 3600 * 24 * 7;
            }else{
                $end_time = $end;
            }
            

            $sql = "select
                  interface,
                  sum(num) as num,
                  sum(spend) as spend,
                  sum(z200) as z200,
                  sum(z201) as z201,
                  sum(z202) as z202,
                  sum(z204) as z204,
                  sum(z303) as z303,
                  sum(z404) as z404,
                  sum(other) as other
                from interface_logs
                where interface='{$inter}' 
                and log_time>={$start}
                and log_time<{$end_time}
                group by interface";

            //echo $sql;//exit();
            $log = self::$mysql->query($sql);

            if ($log) {
                $log->log_time = $start;
                $logs[] = $log;
            }

            $start += 3600 * 24 * 7;
            
        }
        
        return $logs;
    }
}