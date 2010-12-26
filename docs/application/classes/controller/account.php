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


    public function action_works_list()
    {
	$this->template->title = "title";
	$this->template->content = View::factory('account/works_list');
    }


    public function action_regist_contents()
    {

	// get work model instanse
	$work = ORM::factory('work');

	$data['errors'] = $work->get_forms();
	// regist post empry ?
	if ($post = $this->request->get_post()) {
	    
	    #Load the validation rules, filters etc...
	    $ary  = $work->validate_create($post);
	    
	    $file_valid = true;

	    if ($file = $_FILES) {
		var_dump($file['logo_image']['error']);
		$file = $work->validate_create_by_file($_FILES);
		$file_valid = $file->check();

	    }

	    if ($ary->check() && $file_valid) {

		$this->session->set("account/post", $post);
		$this->request->redirect("account/confirm_contents");



	    } else {

		#Get errors for display in view
		$post = array_intersect_key($ary->as_array(), $post);
		$this->errors = $ary->errors('account');

		if ($file && $file_error = $file->errors('account')) {
		    $f = array_intersect_key($file->as_array(), $_FILES);
		    //$file_error = $file->errors('account');
		    //var_dump($file_error);
		    $this->errors['logo_image'] = $file_error['logo_image'];
		}

		$data['errors'] = array_merge($data['errors'],$this->errors);

	    }
	    
	}
	
	$data['form'] = $work->get_forms($post);
	$category_pulldown = ORM::factory('category')->get_categorys_to_pulldown_columns();
	$data['categorys'] = $category_pulldown;

	$this->template->title = "title";
	$this->template->content = View::factory('account/regist_contents', $data);
    }


    public function action_confirm_contents()
    {
	$post = $this->session->get('account/post', null);

	if (is_null($post)) {

	    // redirect
	    $this->request->redirect('account/regist_contents');	    

	}

	$category = ORM::factory('category')->category_key_to_value($post['category_id']);

    }


    public function action_regist_image()
    {

    }


    public function action_edit_contents()
    {

    }


    public function action_delete_contents()
    {

    }


    public function action_delete_image()
    {

    }


}
