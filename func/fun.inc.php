<?php
/**
 * Created by PhpStorm.
 * Author: wangzhiqiang
 * Date: 2015/10/14
 * Time: 9:29
 */


function response($data, $status_code = 200, $is_error = false, $status_jcode = null)
{
    if($is_error)
    {
        header($_SERVER['SERVER_PROTOCOL'].' '.$status_code);
        echo json_encode(
            array('code' => isset($status_jcode)? $status_jcode : $status_code, 'message' => $data)
        );
    }
    else
    {
        switch ($status_code)
        {
            case 200:
                $status_code = '200 OK';
                break;
            case 201:
                $status_code = '201 Created';
                break;
            case 202:
                $status_code = '202 Accepted';
                break;
            case 204:
                $status_code = '204 No Content';
                break;
            case 303:
                $status_code = '303 See Other';
                break;
            default:
                break;
        }

        header($_SERVER['SERVER_PROTOCOL'].' '.$status_code);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
    exit;
}

/**
 * L [2015.10.14修改]
 * @author wangzhiqiang
 * @param $className
 * @param null $param
 * @param bool|false $debug
 * @return mixed
 */
function L($className,$param = null,$debug = false)
{
    static $have;
    //$MYlib 	= MY_LIBS.'/'.$className.'.class.php';

    $lib 	= LIBS.'/'.$className.'.class.php';
    //have args
    if(isset($have[$className]) && $param && @$have[$className][md5(serialize($param))])
    {
        return $have[$className][md5(serialize($param))];// return obj
    }
    //no args
    elseif(@isset($have[$className]) && !$param && @is_object($have[$className]['noparam']))
    {
        return @$have[$className]['noparam'];
    }
    else
    {
        if(is_file($lib))include_once($lib);
        else
        {
            if($debug)
                throw new \InvalidArgumentException('class '.$className.' no input');
            else
                response('class '.$className.' no input','404');
        }

        if($param)
        {
            $have[$className][md5(serialize($param))]  = new $className($param);
            return $have[$className][md5(serialize($param))];
        }
        else
        {
            $have[$className]['noparam'] = new $className();
            return 	$have[$className]['noparam'];
        }
    }

}
