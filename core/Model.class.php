<?php
#-------------------------------------------------
#--
#-- Model MY数据模型控制器
#-- @author libo
#-- @package Core
#-- @copyright 2009 - 2014
#-------------------------------------------------

namespace core;
use config\Config;

class Model 
{	

	var $name;
	var $mysql;//投射mysql对象
	var $source_name; 


	public function __construct()
	{	
		$config = new Config();
		$this->conf = $config->getDB();
	}

	//注册 mysql
	public  function mysql($name = null)
	{	
		if(ADMIN_MYSQL === TRUE)
		{
			$select = $name?$name:$this->conf['mysql_admin']['default'];
			L('MY_mysql',$this->conf['mysql_admin'][$select])->name = $select;
			$this->mysql = L('MY_mysql',$this->conf['mysql_admin'][$select]);
			return $this->mysql;
		}
		$select = $name?$name:$this->conf['mysql']['default'];
		L('MY_mysql',$this->conf['mysql'][$select])->name = $select;
		$this->mysql = L('MY_mysql',$this->conf['mysql'][$select]);
		return $this->mysql;
	}

	//注册 mongodb
	public function mongo($name = null)
	{	
		$select = $name?$name:$this->conf['mongo']['default'];
		@L('MY_mongo',$this->conf['mongo'][$select])->name = $select;
		return 	@L('MY_mongo',$this->conf['mongo'][$select]);
	}



	//注册 mongodb集群
	public function hmongo($name = null)
	{	
		return 	L('MY_hmongo',$name);
	}



	//注册 memcached
	public function memcache($name = null)
	{
		$select = $name?$name:$this->conf['memcache']['default'];
		@L('MY_memcache',$this->conf['memcache'][$select])->name = $select;
		return 	L('MY_memcache',$this->conf['memcache'][$select]);
	}

	//注册 redis
	public function redis($name = null)
	{	
		$select = $name?$name:0;
		L('MY_redis',$this->conf['redis'])->db =$select;
		return 	L('MY_redis',$this->conf['redis']);
	}


	//注册 redis
	public function hredis($name = null)
	{	
		return 	L('MY_hredis',$name); 
	}

	//注册队列
	public function queue($name = null)
	{	
		$select = $name?$name:$this->conf['queue']['default'];
		return L('MY_queue',$this->conf['queue'][$select]);
	}

	public function cbase($name = null)
	{
		$select = $name?$name:"cache";
		//$select = 'recommend';
		L('MY_cbase',$this->conf['cbase'][$select])->name = $select;
		return L('MY_cbase',$this->conf['cbase'][$select]);
	}
	
	//注册socket
	public function socket($name = null)
	{	
		$select = $name?$name:$this->conf['socket']['default'];
		$conf['name'] =$select;
		$conf['data'] =$this->conf['socket'][$select];
		return L('MY_socket',$conf);
	}


}//[End Class]
?>
