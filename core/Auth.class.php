<?php
/**
 * Created by PhpStorm.
 * Author: wangzhiqiang
 * Date: 2015/10/14
 * Time: 10:08
 */

namespace core;


use config\Config;

class Auth extends Adminview{
    public function __construct(){
        $this->menu();
    }


    public function menu(){
        $path = $this->get_file_and_path();

        $menu = Config::menus();
        $menu_one = [];
        $menu_two = [];
        foreach($menu as $key => $value){
            $first_page = $value[1];
            if(!PATHINFO){
                $one = ['index.php?__my='.$key.'/'.$first_page,$value[0],$key];
            }else{
                $one = ['/'.$key.'/'.$first_page,$value[0],$key];
            }
            
            $menu_one[] = $one;

            if($path['clss'] == $key){
                foreach($value[2] as $k => $v){
                    if(!PATHINFO){
                        $two = ['index.php?__my='.$key.'/'.$k,$v,$k];
                    }else{
                        $two = ['/'.$key.'/'.$k,$v,$k];
                    }
                    
                    $menu_two[] = $two;
                }
            }
        }

        if(PATHINFO){
            $url = '/';
        }else{
            $url = 'index.php?__my=';
        }

        $this->assign('_url',$url);
        $this->assign('_menu_one',$menu_one);
        $this->assign('_menu_two',$menu_two);
        $this->assign('_file',$path['file']);
        $this->assign('_clss',$path['clss']);
        //print_r($menu_two);exit();
    }
}