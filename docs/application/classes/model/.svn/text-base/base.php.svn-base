<?php defined('SYSPATH') or die('No direct script access.');

class Model_Base extends ORM {

    protected $_db = 'default';

    protected $_rules = array
    (
	'user_name'	    => array
	(
	    'not_empty'	    => NULL,
	    'min_length'	=> array(4),
	    'max_length'	=> array(23),
	    'regex'	    => array('/^[-\pL\pN_.]++$/uD'),
	),
	'mail_address'	    => array
	(
	    'not_empty'	    => NULL,
	    'min_length'	=> array(4),
	    'max_length'	=> array(55),
	    'validate::email'	=> NULL,
	),
	'password'	    => array
	(
	    'not_empty'	    => NULL,
	    'regex'	    => array("/(?=.*\d)(?=.*[a-z]).{8,10}$/"),
	),
	'password_confirm'  => array
	(
	    'matches'	    => array('password'),
	),

    );

    protected $_callbacks = array
    (
	//'user_name'	    => array('username_available'),
	'mail_address'	    => array('email_available'),
    );

    protected $_login_callbacks = array
    (
	'mail_address'      => array('email_search'),
	'password'          => array('password_search')
    );

    public function email_available(Validate $array, $field)
    {
	if ($this->unique_key_exists($array[$field], $field)) {
	    $array->error($field, 'email_available', array($array[$field]));
	}
    }

    public function password_search(Validate $array, $field)
    {
	if (!$this->unique_key_exists($array[$field], $field)) {
	    $array->error($field, 'password_search', array($array[$field]));
	}
    }

    public function email_search(Validate $array, $field)
    {
	if (!$this->unique_key_exists($array[$field], $field)) {
	    $array->error($field, 'email_search', array($array[$field]));
	}
    }

    public function unique_key_exists($value, $field)
    {
	return (bool) DB::select(array('COUNT("*")', 'total_count'))
			->from($this->_table_name)
			->where($field, '=', $value)
			->execute($this->_db)
			->get('total_count');
    }


}
