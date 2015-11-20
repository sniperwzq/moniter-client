<?php
/**
 * Created by PhpStorm.
 * Author: wangzhiqiang
 * Date: 2015/10/14
 * Time: 9:11
 */

date_default_timezone_set("asia/shanghai");

//include __DIR__.'/core/Server.php';

error_reporting(E_ALL ^ E_NOTICE);

define('BASEDIR',__DIR__);
define("CTRL"	, BASEDIR."/controller");	//控制器目录
define("LIBS"	, BASEDIR."/library");	    //前端目录
define("VIEW"	, BASEDIR."/views");		//模板目录
define("FROT"	, BASEDIR."/front");	    //前端目录
define("PATHINFO", false); //pathinfo模式

//加载公用方法
include BASEDIR.'/func/fun.inc.php';
include BASEDIR.'/core/Autoload.class.php';

use core\Autoload;
use core\Controller;

//注册自动加载
spl_autoload_register('autoload');
function autoload($classname){
    $filename = BASEDIR.'/'.str_replace('\\','/',$classname).'.class.php';
    if (file_exists($filename)) {
        include_once "$filename";
    } else {
        echo '文件'.$filename.'不存在'.PHP_EOL;
    }
}


//初始化
$controller = new Controller();
//框架开始
$controller->route();
