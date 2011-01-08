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


    public function action_contents_list()
    {
	$contents = ORM::factory('content')
	    ->order_by('regist_date', 'desc')
	    ->find_all();

	$data['contents'] = $contents;
	//$capture = View::factory('account/contents_list', $data)->render();
	//file_put_contents('/var/www/html/test.html', $capture);
	//exit;
	
	$this->template->title = "title";
	$this->template->content = View::factory('account/contents_list', $data);
    }


    public function action_regist_contents()
    {

	// get work model instanse
	$content = ORM::factory('content');

	$data['errors'] = $content->get_forms();
	// regist post empry ?
	if ($post = $this->request->get_post()) {
	    
	    #Load the validation rules, filters etc...
	    $ary  = $content->validate_create($post);
	    
	    // フォームにファイル項目がある時のみ機能する
	    // 無い場合は常に許可する
	    $file_valid = true;

	    // フォームにファイル項目があれば通る
	    if (isset($_FILES)) {

		$files = $_FILES;
		$file = $content->validate_create_by_file($files);
		$file_valid = $file->check();

	    }

	    if ($ary->check() && $file_valid) {
		$date = date('Y-m-d h:i:s');
		$content->values($post);
		$content->regist_date = $date;
		$content->save();

		if ($content->get_saved_flag()) {

		    // フォームにファイル項目があれば通る
		    if (!empty($files)) {

			$image_model = ORM::factory('contentimage');
			$saved_id = Image::factory($file['image'])
			    ->init($content->id, $content->name)
			    ->upload_and_save_by_image($image_model);
			if ($saved_id) {
			    $content->image_id = $saved_id;
			    $content->save();
			}

		    } 

		    $this->request->redirect("account/contents_list");

		} else {

		    throw new Kohana_Exception('cant save this data');

		    // データを保存中に問題が発生しました管理者にお問い合わせ下さい
		    $this->session->set("account/exceptions", DATA_SAVED_ERROR);
		    $this->request->redirect("account/errors");

		}

	    } else {

		#Get errors for display in view
		$post = array_intersect_key($ary->as_array(), $post);
		$this->errors = $ary->errors('account');

		if ($file && $file_error = $file->errors('account')) {
		    $f = array_intersect_key($file->as_array(), $files);
		    //$file_error = $file->errors('account');
		    //var_dump($file_error);
		    $this->errors['logo_image'] = $file_error['logo_image'];
		}

		$data['errors'] = array_merge($data['errors'],$this->errors);

	    }
	    
	}
	
	$data['form'] = $content->get_forms($post);
	$category_pulldown = ORM::factory('category')->get_categorys_to_pulldown_columns();
	$data['categorys'] = $category_pulldown;

	$this->template->title = "title";
	$this->template->content = View::factory('account/regist_contents', $data);
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

    public function action_errors()
    {
	$error = $this->session->get('account/exceptions', null);

	if (is_null($error)) {

	    $this->request->redirect('account/regist_contents');

	} 

	$data['error'] = $error;
	$this->session->delete('account/exceptions');

	$this->template->title = "title";
	$this->template->content = View::factory('account/errors', $data);
    }

}
