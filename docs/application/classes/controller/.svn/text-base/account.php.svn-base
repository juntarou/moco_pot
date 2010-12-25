<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Account extends Controller_Base {

    public $template = "templates/base";

    public function __construct(Kohana_Request $request)
    {

	parent::__construct($request);
	
    }

    public function before()
    {
	parent::before();
    }

    public function set_layout($data)
    {
	    $this->template->header = View::factory('share/header', $data);
	    $this->template->side_bar = View::factroy('share/side_bar', $data);
	    $this->template->footer = View::factory('share/footer', $data);
    }

    public function action_myaccount()
    {
	$this->template->title = "title";
	$this->template->content = View::factory('account/myaccount');
    }


}
