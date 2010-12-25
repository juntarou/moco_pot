<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Regist extends Controller_Base {


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


	public function action_index()
	{

	    if(Auth::instance()->logged_in()!= 0){
		echo "is logined!!";
		#redirect to the user account
		$this->request->redirect('account/myaccount');	
	    }

	    #Instantiate a new user
	    $user = ORM::factory('user');
	    $data['errors'] = $user->get_forms();

	    #If there is a post and $_POST is not empty
	    if ($post = $this->request->get_post()) {
   
		#Load the validation rules, filters etc...
		$ary = $user->validate_create($post);	    
     
		#If the post data validates using the rules setup in the user model
		

		if ($ary->check()) {

		    $this->session->set("regist/post",$post);
		    $this->request->redirect("regist/confirm");

		} else {
		    #Get errors for display in view
		    $post = array_intersect_key($ary->as_array(), $post);
		    $this->errors = $ary->errors('regist');
		    $data['errors'] = array_merge($data['errors'],$this->errors);
		}		
	    }   

	    $data['form'] = $user->get_forms($post);
	    //$this->set_layout($data);
	    $this->template->title = "title";
	    $this->template->content = View::factory('regist/index',$data);

	}

	public function action_confirm()
	{

	    $post = $this->session->get("regist/post", null);
	    if (is_null($post)) {
		$this->request->redirect("regist/index");
	    }

	    if ($this->request->get_post("regist")) {
		$user = ORM::factory('user');
		#Affects the sanitized vars to the user object
		$user->values($post);
		$user->regist_date = DB::expr('now()');
 
		#create the account
		$user->save();
 
		#Add the login role to the user
		$login_role = new Model_Role(array('name' =>'login'));
		$user->add('roles',$login_role);
 
		#sign the user in
		Auth::instance()->login($post['username'], $post['password']);
 
		#redirect to the user account
		Request::instance()->redirect('account/myaccount');
	    }

	    $data['post'] = $post;
	    $this->template->title = "title";
	    $this->template->content = View::factory('regist/confirm',$data);
	}

	public function action_complete()
	{

	    $this->template->title = "title";
	    $this->template->content = View::factory('regist/complete');
    
	}

} // End Regist
