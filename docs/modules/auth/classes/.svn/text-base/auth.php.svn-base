<?php defined('SYSPATH') or die('No direct access allowed.');

abstract class Auth extends Kohana_Auth {


	private static $regist_form = array(
		'email' => '',
		'username' => '',
		'password' => ''
	);
	
	public function __construct($config = array())
	{
		parent::__construct($config);
	}

	public static function get_regist_form()
	{
		return self::$regist_form;	
	}

}
