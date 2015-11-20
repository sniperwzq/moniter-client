<?php

namespace controller;
use core\Auth;
use config\Config;
use model\Dmain_list;


class setmoniter_C extends Auth{
	private $redis = [];


	public function setdmain(){
		$dmain_list_db = new Dmain_list();

		if($_POST){
			$info['dmain'] = trim($_POST['add_dmain']);
			$info['update_time'] = date('Y-m-d H:i:s');
			$info['status'] = 0;

			$dmain_list_db->addDmain($info);
		}

		$list = $dmain_list_db->getList();
		$this->assign('list',$list);
	}


	public function open_moniter(){
		$dmainid = trim($_POST['dmainid']);
		//$dmain = trim($_POST['dmain']);
		$dmain_list_db = new Dmain_list();

		$val = $dmain_list_db->open_moniter($dmainid);
		$list = [];
		if (is_array($val) && count($val) > 0) {
			foreach ($val as $value) {
				$list[] = $value->dmain;
			}
		}

		if (count($list) > 0) {
			$list = implode('|', $list);
			//写入redis共享给udp服务器
			$redis = $this->getRedis();
			$dmain_list = $redis->set('dmain',$list);

			$socket = stream_socket_client('udp://192.168.1.49:9501');
			$data = ['control'=>'reload'];
			$data = json_encode($data).'\r\n';
	        if(!$socket)
	        {
	            exit(json_encode(false));
	        }else{
	            stream_socket_sendto($socket, $data);
	            exit(json_encode(true));
	        }

			
		}else{
			exit(json_encode(false));
		}

		
	}


	public function close_moniter(){
		$dmainid = trim($_POST['dmainid']);
		//$dmain = trim($_POST['dmain']);
		$dmain_list_db = new Dmain_list();

		$val = $dmain_list_db->close_moniter($dmainid);
		$list = [];
		if (is_array($val) && count($val) > 0) {
			foreach ($val as $value) {
				$list[] = $value->dmain;
			}
		}

		if (count($list) > 0) {
			$list = implode('|', $list);	
		}else{
			$list = '';
			
		}
		//写入redis共享给udp服务器
		$redis = $this->getRedis();
		$dmain_list = $redis->set('dmain',$list);

		$socket = stream_socket_client('udp://211.151.98.92:9501');
		$data = ['control'=>'reload'];
		$data = json_encode($data).'\r\n';
        if(!$socket)
        {
            exit(json_encode(false));
        }else{
            stream_socket_sendto($socket, $data);
            exit(json_encode(true));
        }
	}



	public function delete_moniter(){
		$dmainid = trim($_POST['dmainid']);
		$dmain_list_db = new Dmain_list();

		$val = $dmain_list_db->delete_moniter($dmainid);
		exit(json_encode(true));
	}



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