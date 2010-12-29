<?php defined('SYSPATH') or die('No direct script access.');

class Model_Logo extends Model_Base {

    protected $_table_name  = 'logo_images'; // default: accounts
    protected $_primary_key = 'id';      // default: id
    //protected $_primary_val = 'strange_name';      // default: name (column used as primary value)

    protected $_table_columns = array(
        'id'            => array('data_type' => 'int',    'is_nullable' => FALSE),
        'filepath'      => array('data_type' => 'string', 'is_nullable' => FALSE),
        'width'         => array('data_type' => 'string', 'is_nullable' => FALSE),
        'height'        => array('data_type' => 'string', 'is_nullable' => FALSE),
        'alt'		=> array('data_type' => 'string', 'is_nullable' => TRUE),        
        'regist_date'   => array('data_type' => 'string', 'is_nullable' => FALSE),
    );

    protected $_has_one = array('work' => array('model' => 'work'));

}
