<?php
namespace core;
//use controller;

class Controller extends Route {

	protected $con;
	protected $fun;
	protected $conr;
	protected $cls;

	/**
	 * 项目引导（控制器、自动加载等）
	 *
	 * 详细说明
	 * @形参
	 * @访问      公有
	 * @返回值    void
	 * @throws
	 * zmy
	 */
	function route()
	{
		//自动加载注册
		//$this->autoload();

		//控制器加载
		$this->to_controller();

		//视图末尾控制
		$this->to_view();
	}

	/**
	 * 视图末尾控制
	 *
	 * 详细说明
	 * @形参
	 * @访问      公有
	 * @返回值    void
	 * @throws
	 * zmy
	 */
	function to_view()
	{
		//如果视图未开启则默认开启
		if($this->conr->is_view === FALSE)
		{
			$this->conr->toview();
		}
	}

	/**
	 * to_controller [description] 2015.10.14修改
	 * @author wangzhiqiang
	 */
	function to_controller()
	{
		$c_dir = $this->controller_route();
		//print_r($c_dir);exit();

		if(file_exists($c_dir))
		{
			include_once $c_dir;

			$con_name   = '\controller\\'.$this->cls.'_C';
			$this->conr = new $con_name();
			$fun_name   = $this->fun;

			//控制器加载
			$this->conr->$fun_name();
		}
		//404
		else
		{
			response("controller not found",404);
		}
	}

	/**
	 * 控制器加载路由规则
	 *
	 * 详细说明
	 * @形参
	 * @访问      公有
	 * @返回值    void
	 * @throws
	 * zmy
	 */
	function controller_route()
	{	
		$arr = $this->get_file_and_path();
		$this->fun    = $arr['file'];
		$this->con    = $arr['path'];
		$this->cls    = $arr['clss'];

		//加载控制器
		return CTRL.'/'.$this->con.'.php';
	}

	/**
	 * 自动加载注册
	 *
	 * 详细说明
	 * @形参
	 * @访问      公有
	 * @返回值    void
	 * @throws
	 * zmy
	 */
	function autoload()
	{
		$autoload_obj = new Autoload();
		spl_autoload_register(array($autoload_obj,'load'));
	}

}