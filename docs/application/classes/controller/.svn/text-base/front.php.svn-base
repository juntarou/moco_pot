<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Front extends Controller_Base {

	public $template = "templates/base";

	public function __construct(Kohana_Request $request)
	{
	    parent::__construct($request);
	}

	/**
	* karai tabe
	* top page
	**/	
/*
	public function action_index()
	{
	    // ログインチェック
	    if ($this->_login_status) {
		// redirect
	    }
	    $this->template->title = "title";
	    $this->template->content = View::factory('index');    
	}
*/


    public function action_login()
    {
	#If user already signed-in

#	if(Auth::instance()->logged_in()!= 0){
#	    #redirect to the user account
#	    Request::instance()->redirect('account/myaccount');	    
#	}
	#Instantiate a new user
	$user = ORM::factory('user');
	$data['errors'] = $user->get_forms();

	#If there is a post and $_POST is not empty
	if ($post = $this->request->get_post())
	{

	    #Check Auth
	    $status = $user->login($post);
 
	    #If the post data validates using the rules setup in the user model
	    if ($status)
	    {	    
		#redirect to the user account
		Request::instance()->redirect('account/myaccount');

	    } else {
                #Get errors for display in view
		$this->errors = $post->errors('signin');
		$data['errors'] = $this->errors;
	    }
 
	}

	$data['form'] = $user->get_forms($_POST);

	$this->template->title = "title";
	$this->template->content = View::factory('login', $data);

/*
	if ($post = $this->request->get_post()) {

	    $user = ORM::factory('auth');	
	    $ary = $user->login_validate_create($post);

	    if ($ary->check()) {
		$this->_login_status = true;
		echo "ok";
		$this->request->redirect('cms/mypage');
	    } else {

		$post = array_intersect_key($ary->as_array(), $post);
		$this->errors = $ary->errors('regist');

	    }
	}
*/
    }



} // End Front
