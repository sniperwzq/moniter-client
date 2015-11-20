<?php
namespace core;

class Adminview extends Route {

	public $pamas   = array();
	public $is_view = FALSE;

	/**
	 * 视图加载
	 *
	 * 详细说明
	 * @形参
	 * @访问      公有
	 * @返回值    void
	 * @throws
	 * zmy
	 */
	function toview($set_view = '')
	{
		$this->is_view = TRUE;

		$v_dir = $this->view_route($set_view);

		if(file_exists($v_dir))
		{
			//参数赋值
			if(!empty($this->pamas))
			{
				foreach($this->pamas AS $k=>$row)
				{
					$$k = $row;
				}
			}

			//utf-8
			header("Content-type:text/html;charset=utf-8");

			//加载
			include_once $v_dir;
		}
		//404
		else
		{
			response("view not found",404);
		}
	}

	/**
	 * 视图加载路由规则
	 *
	 * 详细说明
	 * @形参
	 * @访问      公有
	 * @返回值    void
	 * @throws
	 * zmy
	 */
	function view_route($set_view)
	{
		//初始化view
		$arr        = $this->get_file_and_path();
		$def_view   = $arr['path'].'/'.$arr['file'];
		$view       = empty($set_view)?$def_view:$set_view;

		//加载模板
		return VIEW.'/'.$view.'.php';
	}

	/**
	 * 视图参数赋值
	 *
	 * 详细说明
	 * @形参
	 * @访问      公有
	 * @返回值    void
	 * @throws
	 * zmy
	 */
	function assign($name,$val)
	{
		$this->pamas[$name] = $val;
	}

	/**
	 * 输出消息
	 *
	 * 详细说明
	 * @形参
	 * @访问      公有
	 * @返回值    void
	 * @throws
	 * zmy
	 */
	function show_message($message,$type = 'error',$return_url = '###',$js = '')
	{
		//会跳页面
		if($return_url == '###')
		{
			$return_js  = 'history.go(-1)';
		}

		switch($type)
		{
			case 'error':$conf = array(

				'backcolor' =>'#f2dede',
				'border'    =>'#ebccd1',
				'title'     =>'失败',
				'textcolor' =>'#a94442',

			);break;
			case 'success':$conf = array(

				'backcolor' =>'#dff0d8',
				'border'    =>'#dff0d8',
				'title'     =>'成功',
				'textcolor' =>'#468847',

			);break;
			case 'warning':$conf = array(

				'backcolor' =>'#fcf8e3',
				'border'    =>'#faebcc',
				'title'     =>'警告',
				'textcolor' =>'#f0ad4e',

			);break;
		}

		if(empty($return_js))
		{
			$jump = 'window.location.href = "'.$return_url.'";';
		}
		else
		{
			$jump = $return_js;
		}

		$default_js = '
				delayURL();
				function delayURL()
				{
					var delay 	= document.getElementById("time").innerHTML;
			        var t 		= setTimeout("delayURL()", 1000);

					if(delay > 0)
					{
						delay--;
						document.getElementById("time").innerHTML = delay;
					}
					else
					{
				        clearTimeout(t);
				        '.$js.$jump.'
					}
				}';


		$div = '
		<html>
		<body style="padding-top:40px; padding-bottom:40px; width:99%; text-align:center; font:700 16px/1.5em Arial,Verdana,\'microsoft yahei\';">
			<div style="margin-right:auto; margin-left:auto; width:300px; height:200px; background:'.$conf['backcolor'].'; text-align:center; border:1px solid '.$conf['border'].';">
				<h5 style="color:#A94402; font-weight:normal;">美柚系统：'.$conf['title'].'消息</h5>
				<h2 style="color:'.$conf['textcolor'].'; padding:5px 16px; line-height:35px;">'.$message.'</h2>
				<div style=" font-size:10px;">
					<span id="time">1</span>秒钟后跳转...
				</div>
				<script type="text/javascript">
				'.$default_js.'
				</script>
			</div>
		</body>
		</html>';

		//utf-8
		header("Content-type:text/html;charset=utf-8");

		echo $div;exit;
	}

	/**
	 * 表单验证
	 *
	 * 详细说明
	 * @形参
	 * @访问      公有
	 * @返回值    void
	 * @throws
	 * zmy
	 */
	function form($form,array $reg,$is_return = FALSE)
	{
		if(is_array($form))
		{
			$new = array();
		}
		else
		{
			$new = NULL;
		}

		foreach($reg AS $k=>$row)
		{
			if(isset($row['reg']))
			{
				if(is_array($form))
				{
					$f = $form[$k];
				}
				else
				{
					$f = $form;
				}

				if($row['is_empty'] === TRUE && empty($f))
				{
					if(is_array($form))
					{
						$new[$k] = $f;
					}
					else
					{
						$new = $f;
					}
				}
				elseif($row['is_empty'] === FALSE && empty($f))
				{
					$e = array(
						'error'	=> array(
							'error_typ' =>'isEmpty',
							'error_msg'	=> (empty($row['name'])?$k:$row['name']).'-字段不能为空'
						)
					);

					if($is_return === TRUE)
					{
						return $e;
					}
					else
					{
						$this->show_message($e['error']['error_msg']);
					}
				}
				else
				{
					if(preg_match($row['reg'], $f))
					{
						if(is_array($form))
						{
							$new[$k] = $f;
						}
						else
						{
							$new = $f;
						}
					}
					else
					{
						$e = array(
							'error'	=> array(
								'error_typ' =>'regexNotMatch',
								'error_msg'	=> (empty($row['name'])?$k:$row['name']).'-字段不符合格式要求'
							)
						);

						if($is_return === TRUE)
						{
							return $e;
						}
						else
						{
							$this->show_message($e['error']['error_msg']);
						}
					}
				}
			}
			else
			{
				/*if(empty($form[$k]))
				{
					continue;
				}*/

				if(!isset($form[$k][0]))
				{
					$tmp = $form[$k];
					unset($form[$k]);
					$form[$k][0] = $tmp;
				}

				foreach($form[$k] AS $ks=>$rows)
				{
					$t = $this->form($rows,$row,TRUE);

					$new[$k][] = $t;

					if(!empty($t['error']))
					{
						if($is_return === TRUE)
						{
							return $t;
						}
						else
						{
							$this->show_message((empty($row['name'])?$k:$row['name']).'-'.$t['error']['error_msg']);
						}
					}
				}
			}
		}

		return $new;
	}
}

?>
