<?php
/**
 * Created by PhpStorm.
 * Author: wangzhiqiang
 * Date: 2015/10/14
 * Time: 11:05
 */

namespace controller;
use core\Auth;
use config\Config;

class real_C extends Auth{
    /**
     * real_time [实时监控]
     * @author wangzhiqiang 2015.10.14
     */
    
    private $redis = [];
    
    public function real_time(){
    	
        $redis = $this->getRedis();
    	$dmain = $redis->get('dmain');
        if ($dmain) {
            $dmain_list = explode('|', $dmain);
        }else{
            $dmain_list = [];
        }

    	if(isset($_GET['real_dmain']) && !empty($_GET['real_dmain'])){
            $this->assign('dmain',trim($_GET['real_dmain']));
        }else{
            $this->assign('dmain', 'real_statistics');
        }

    	
    	$this->assign('dmain_list',$dmain_list);
    }

    /**
     * getRedis [reids实例]
     * @author wangzhiqiang
     * @param int $id
     * @return mixed
     */
    public function getRedis($id = 0)
    {
        if(empty($this->redis[$id]) || !$this->redis[$id]->info()){
            $this->redis[$id] = new \Redis();
            $config = Config::get_redis_config();
            $res = $this->redis[$id]->connect($config['host'],$config['port']);
            $this->redis[$id]->auth($config['password']);
            $this->redis[$id]->select($id);
            if(!$res){

            }
        }

        return $this->redis[$id];
    }
}