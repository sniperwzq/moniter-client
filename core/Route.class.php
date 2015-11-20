<?php
namespace core;

class Route{

	public $def_path    = 'index';
	public $def_file    = 'index';
	public $arr         = array();

	function get_file_and_path()
	{
		
		if(!empty($this->arr))
		{
			return $this->arr;
		}

		$url = array();

		if(!empty($_SERVER['PATH_INFO']) && PATHINFO)
		{
			$r_url  = strtolower($_SERVER['PATH_INFO']);
			$url    = explode('/',$r_url);
			unset($url[0]);
		}else{
			$r_url  = strtolower($_GET['__my']);
			$url    = explode('/',$r_url);
			//unset($url[0]);
		}

		//控制器识别优先
		$count = count($url);

		if($count == 1)
		{
			$path    = implode('/',$url);
		}
		elseif($count > 1)
		{
			$file    = array_pop($url);
			$path    = implode('/',$url);
		}

		$f_file = empty($file)?$this->def_file:$file;
		$f_path = empty($path)?$this->def_path:$path;
		$f_clss = explode('/',$f_path);
		$f_clss = array_pop($f_clss);

		$this->arr = array(
			'file'  => $f_file,
			'path'  => $f_path,
			'clss'  => $f_clss,
		);

		return $this->arr;
	}

}