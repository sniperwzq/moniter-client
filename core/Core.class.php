<?php
#-------------------------------------------------
#--
#-- Core MY逻辑控制器
#-- @author libo
#-- @package Core
#-- @copyright 2009 - 2014
#-------------------------------------------------

namespace core;

abstract class Core extends Model
{	
	public $template = false;			//预定义模板
	public abstract function execute();	//抽象方法
	public $mthod;


	/*
	 * @ Controller 
	 * @ param $dir request_uri
	 * @ param $action  restful/web
	 * @ 逻辑控制器
	 */
	public function Controller($dir,$action)
	{	
		unset ($_REQUEST['__my']);
		switch ($action) 
		{
			case 1: //restful
				return $this->load_restful($this->restful_fetch_className($dir));
				break;
			case 2: //frame
				return $this->load_framework($this->framework_fetch_className($dir));
				break;
			default:
				return $this->load_restful($this->restful_fetch_className($dir));
				break;
		}
	}

	//接口
	public function load_restful($keyValue)
	{
		$action = array();$action_map = MAPS.'/action.map.php';
		if(file_exists($action_map))include_once $action_map;
		if($action)//进入ActionMap模式
		{	
			$keyName = $keyValue['className'];
			$className  = @$action[$keyName]['className'];
			$dirname    = @$action[$keyName]['dirName'];		
			if($className)
			{	
				$dir  = MODE.'/'.$dirname.'/'.$className.'.class.php';
				if(file_exists($dir))
				{	
					include_once $dir;
					$keyValue['className'] = $className;
					return $keyValue;
				}
				else
				{
					response($className." not in file",404);
				}
			}
			//response("key ".$keyName." not in map ",404);
			
		}
		//else
		//{
		$className = $keyValue['className'];
		$dir  = MODE.'/'.$className.'.class.php';
		if(file_exists($dir))
		{	
			include_once $dir;
			return $keyValue;
		}
		else
		{
			response($className." not in file",404);
		}
		
		//}
	}



	//web框架
	public function load_framework($keyValue)
	{
		if($keyValue['module'] && $keyValue['className'])
		{
			if(file_exists(MODE.'/'.$keyValue['module'].'/'.$keyValue['className'].'.class.php'))
			{
				include_once MODE.'/'.$keyValue['module'].'/'.$keyValue['className'].'.class.php';	
				return $keyValue;
			}
			else
			{
				response("module and class both not in",404);
			}
		}
		elseif($keyValue['module'])
		{	
			if(file_exists(MODE.'/'.$keyValue['module'].'/index.class.php'))
			{
				include_once MODE.'/'.$keyValue['module'].'/index.class.php';
				return $keyValue;
			}
			else
			{
				response('module not in',404);
			}
			
		}
		else
		{
			include_once MODE.'/home/index.class.php';
			return array('module'=>'home','className'=>'index');
		}
	}


	//数据处理
	public function restful_fetch_className($dir)
	{	
		$params = array();
		$data = array();
		$table = explode("/", $dir);
		if(is_array($table))
		{
			foreach ($table as $key => $value) 
			{	
				if(trim($value))
				{	
					if(filter_var($value, FILTER_VALIDATE_INT) === false && filter_var($value, FILTER_VALIDATE_INT)===false)//判断数字类型
					{
						$data[]= str_replace(".php","",str_replace("-", "_", $value));
					}
					else //处理数字类型
					{
						$_GET['id'] = $value;
					}
				}
			}
			$className = $data ? implode("_", $data):"index";
		}

		return array('className' =>$className);

	}


	//
	public function  framework_fetch_className($dir)
	{
		$params = array();
		$table = explode("/", $dir);
		if(is_array($table))
		{
			foreach ($table as $key => $value) 
			{	
				if(trim($value))
				{	
					if(filter_var($value, FILTER_VALIDATE_INT) === false && filter_var($value, FILTER_VALIDATE_INT)===false)//判断数字类型
					{
						$data[]= $value;
					}
					else //处理数字类型
					{
						$_GET['id'] = $value;
					}
				}
			}
		}
		return array('module'=>$data[0],'className'=>$data[1]);
	}
}//[End Class]
?>
