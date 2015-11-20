<?php
/**
 * Created by PhpStorm.
 * Author: wangzhiqiang
 * Date: 2015/10/14
 * Time: 10:05
 */

namespace controller;
use core\Auth;

class test_C extends Auth{
    public function index(){
        echo 'this is a test';
    }
}