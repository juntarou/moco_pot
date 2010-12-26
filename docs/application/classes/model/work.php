<?php defined('SYSPATH') or die('No direct script access.');

class Model_Work extends Model_Base {

    protected $_table_name  = 'works'; // default: accounts
    protected $_primary_key = 'id';      // default: id
    //protected $_primary_val = 'strange_name';      // default: name (column used as primary value)

    protected $_table_columns = array(
        'id'            => array('data_type' => 'int',    'is_nullable' => FALSE),
        'category_id'   => array('data_type' => 'int',    'is_nullable' => FALSE),
        'name'          => array('data_type' => 'string', 'is_nullable' => FALSE),
        'logo_image'    => array('data_type' => 'string', 'is_nullable' => FALSE),
        'dir_name'      => array('data_type' => 'string', 'is_nullable' => FALSE),
        'regist_date'   => array('data_type' => 'string', 'is_nullable' => FALSE),
    );


    protected $_forms = array(
	"category_id"      =>   "",
	"name"             =>   "",
	"logo_image"       =>   "",
	"dir_name"         =>   "",
	"regist_date"      =>   "",
    );

    public function validate_create($postvalues)
    {
	$array = Validate::factory($postvalues)
			->rules('category_id', $this->_rules['category_id'])
			->rules('name', $this->_rules['name'])
			->filter('category_id', 'trim')
			->filter('name', 'trim');

	return $array;

    }

    public function validate_create_by_file($postvalues)
    {
	$array = Validate::factory($postvalues)
			->rules('logo_image', $this->_upload_rules['logo_image']);

	return $array;

    }

}
