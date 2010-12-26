<?php defined('SYSPATH') or die('No direct script access.');

class Model_Category extends Model_Base {

    protected $_table_name  = 'categorys'; // default: accounts
    protected $_primary_key = 'id';      // default: id
    //protected $_primary_val = 'strange_name';      // default: name (column used as primary value)

    protected $_table_columns = array(
        'id'   => array('data_type' => 'int',    'is_nullable' => FALSE),
        'name'  => array('data_type' => 'string', 'is_nullable' => FALSE),
        'dir_name'  => array('data_type' => 'string', 'is_nullable' => FALSE),
        'regist_date'  => array('data_type' => 'string', 'is_nullable' => FALSE),
    );


    protected $_forms = array(
	"name"       =>   "",
	"dir_name"    =>   "",
	"regist_date"        =>   "",
    );


    public function get_categorys()
    {
	return $this->find_all();
    }

    public function get_categorys_to_pulldown_columns()
    {
	// get categorys
	$categorys = $this->get_categorys();
	$tmp = array();

	// set default column
	$tmp[0] = "選択して下さい";

	// set columns
	foreach ($categorys as $category)
	{
	    $tmp[$category->id] = $category->name;
	}

	return $tmp;
    }


    public function category_key_to_value($key)
    {
	// get categorys
	$category = $this->find($key);
	return $category->name;

    }

}
