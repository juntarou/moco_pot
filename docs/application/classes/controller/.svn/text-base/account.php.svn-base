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
	$works = ORM::factory('work')
	    ->order_by('regist_date', 'desc')
	    ->find_all();

	$data['works'] = $works;
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
	    
	    // フォームにファイル項目がある時のみ機能する
	    // 無い場合は常に許可する
	    $file_valid = true;

	    // フォームにファイル項目があれば通る
	    if ($files = $_FILES) {
		
		$file = $work->validate_create_by_file($files);
		$file_valid = $file->check();

	    }

	    if ($ary->check() && $file_valid) {
		$date = date('Y-m-d h:i:s');
		$work->values($post);
		$work->regist_date = $date;
		$work->save();

		if ($work->get_saved_flag()) {

		    // フォームにファイル項目があれば通る
		    if (!empty($files)) {
			
			$ext = Image::get_ext_type($files['logo_image']['type']);
			$file_name = LOGO_IMAGE_NAME . $work->id . $ext;
			$filepath = LOGO_IMAGES_FULL_PATH . $file_name;

			if (Upload::save($_FILES['logo_image'], $file_name, LOGO_IMAGES_FULL_PATH, 0777)) {

			    $image = Image::factory($filepath);
			    $logo_image = ORM::factory('logo');
			    $logo_image->filepath = $file_name;
			    $logo_image->width = $image->width;
			    $logo_image->height = $image->height;
			    $logo_image->alt = $work->name;
			    $logo_image->regist_date = $date;
			    $logo_image->save();

			} else {

			    // 画像を保存出来ませんでした管理者へお問い合わせ下さい
			    $this->session->set("account/exceptions", IMAGE_UPLOAD_ERROR);
			    $this->request->redirect("account/errors");

			}

		    } 

		    $this->request->redirect("account/works_list");

		} else {

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
	
	$data['form'] = $work->get_forms($post);
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
