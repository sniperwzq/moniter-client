<?php
namespace core;

/**
 * 自动加载类
 */
class Autoload {
	private $basedir = BASEDIR;

	public static function load_framework($models,$class_name)
	{
		if($models && $class_name)
		{
			$m_dir = MODE.'/'.$models.'/'.$class_name.'.php';

			if(file_exists($m_dir))
			{
				include_once $m_dir;
			}
			else
			{
				response('['.$models."]module and [".$class_name."]class both not in",404);
			}
		}
		else
		{
			response('modules parameter error',404);
		}
	}

	/**
	 * [load 自动加载]
	 * @author wangzhiqiang
	 * @DateTime 2015-10-14T09:07:36+0800
	 * @param    [type] $class_name
	 * @return   [type]
	 */
	public function load($class_name)
	{
		$filename = $this->basedir.'/'.str_replace('\\','/',$classname).'.class.php';
	    if (file_exists($filename)) {
	        include_once "$filename";
	    } else {
	        echo '文件'.$filename.'不存在'.PHP_EOL;
	    }
	}

}