<?php

namespace model;

use library\MY_mysql;
use config\Config;

class Dmain_list{
	private static $mysql = null;

    public function __construct()
    {
        if (empty(self::$mysql)) {
            self::$mysql = new MY_mysql(Config::get_mysql_config());
        }

    }

    public function getList(){
    	$sql = "select * from dmain_list";

    	$list = self::$mysql->query($sql,'all');
    	return $list;
    }

    public function addDmain($info){
        self::$mysql->bindvalue(1,$info['dmain']);
        self::$mysql->bindvalue(2,$info['update_time']);
        self::$mysql->bindvalue(3,$info['status']);

        $val = self::$mysql->query('insert into dmain_list(dmain,update_time,status) values(?,?,?)');
        return $val;
    }

    public function open_moniter($dmainid){
    	$dmainid = intval($dmainid);
    	$sql = 'update dmain_list set status=1 where id='.$dmainid;
    	self::$mysql->query($sql);

    	$list = self::$mysql->query("select dmain from dmain_list where status=1",'all');
    	return $list;
    }


    public function close_moniter($dmainid){
    	$dmainid = intval($dmainid);
    	$sql = 'update dmain_list set status=0 where id='.$dmainid;
    	self::$mysql->query($sql);

    	$list = self::$mysql->query("select dmain from dmain_list where status=1",'all');
    	return $list;
    }

    public function delete_moniter($dmainid){
        $dmainid = intval($dmainid);
        $sql = 'delete from dmain_list where id='.$dmainid;
        $res = self::$mysql->query($sql);
        return $res;
    }
}