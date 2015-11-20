<?php
/**
 * Created by PhpStorm.
 * Author: wangzhiqiang
 * Date: 2015/10/14
 * Time: 9:46
 */

namespace config;

/**
 * Class Config
 * @author wangzhiqiang
 * @package config
 */
class Config{

    /**
     * getDB [全部数据库配置]
     * @author wangzhiqiang
     */
    public static function getDB(){
        $all_db_config = [
            'master' => [
                'host' => 'localhost',
                'port' => 3306,
                'db'   => 'statistics',
                'user' => 'root',
                'pass' => 'vrkmsH5kRhwewqSI'
            ],
            'slave' => [
                'host' => 'localhost',
                'port' => 3306,
                'db'   => 'statistics',
                'user' => 'root',
                'pass' => 'vrkmsH5kRhwewqSI'
            ]
        ];
        return $all_db_config;
    }

    /**
     * menus [导航]
     * @author wangzhiqiang
     * @return array
     */
    public static function menus(){
        $menus = [
            'real'=>[
                0=>'实时监控',
                1=>'real_time',
                2=>['real_time'=>'实时监控'],
            ],
            'amount'=>[
                0=>'统计日志',
                1=>'hour',
                2=>['hour'=>'时报','day'=>'日报','week'=>'周报','month'=>'月报'],
            ],
            'port'=>[
                0=>'接口日志',
                1=>'hour',
                2=>['hour'=>'时报','day'=>'日报','week'=>'周报','month'=>'月报'],
            ],
            'setmoniter'=>[
                0=>'监控设置',
                1=>'setdmain',
                2=>['setdmain'=>'设置监控域'],
            ],
        ];
        return $menus;
    }

    public static function get_mysql_config(){
        return [
            'master' => [
                'host' => '192.168.1.49',
                'port' => 33066,
                'db'   => 'statistics',
                'user' => 'wangzq',
                'pass' => 'vdl9R3vVY2g1Bgl7'
            ],
            'slave' => [
                'host' => '192.168.1.49',
                'port' => 33066,
                'db'   => 'statistics',
                'user' => 'wangzq',
                'pass' => 'vdl9R3vVY2g1Bgl7'
            ]
        ];
    }

    /**
     * get_redis_config [redis配置]
     * @author wangzhiqiang
     * @return array
     */
    public static function get_redis_config()
    {
        return [
            'host' => '127.0.0.1',
            'port' => 6379,
            'password' => 'quB1BY3njv0eq1N4e3d9Q570V4mYHldDeb7BFw92'
        ];
    }
}