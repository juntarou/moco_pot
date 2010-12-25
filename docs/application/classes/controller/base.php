<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Base extends Controller_Template {


	// session instance param
	public $session;

	public $data;

	public $input;

	public $_login_status = false;
	
	public function __construct(Kohana_Request $request)
	{
	    parent::__construct($request);
	    $this->session = Session::instance();
	}

} // End Front
