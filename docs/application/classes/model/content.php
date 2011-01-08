<?php defined('SYSPATH') or die('No direct script access.');

class Model_Content extends Model_Base {

    protected $_table_name  = 'contents'; // default: accounts
    protected $_primary_key = 'id';      // default: id
    //protected $_primary_val = 'strange_name';      // default: name (column used as primary value)

    protected $_table_columns = array(
        'id'            => array('data_type' => 'int',    'is_nullable' => FALSE),
        'category_id'   => array('data_type' => 'int',    'is_nullable' => FALSE),
        'image_id'      => array('data_type' => 'int',    'is_nullable' => TRUE),
        'name'          => array('data_type' => 'string', 'is_nullable' => FALSE),
        'dir_name'      => array('data_type' => 'string', 'is_nullable' => TRUE),
        'status'        => array('data_type' => 'int',    'is_nullable' => FALSE),
        'regist_date'   => array('data_type' => 'string', 'is_nullable' => FALSE),
    );

    // orm relationship
    protected $_has_one = array(
	'contentimage' => array(
	    'model' => 'contentimage',
	)
    );

    protected $_belongs_to = array(
	'category' => array(
	    'model'       => 'category',
	    'foreign_key' => 'category_id',
	),
    );

    /*
    protected $_has_many = array(
	'images' => array(
	    'model'      => 'image',
	),
    );
    */

    protected $_forms = array(
	"category_id"      =>   "",
	"name"             =>   "",
	"image"       =>   "",
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
			->rules('image', $this->_upload_rules['image']);

	return $array;

    }

}
