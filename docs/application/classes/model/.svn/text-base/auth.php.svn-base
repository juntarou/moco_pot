<?php defined('SYSPATH') or die('No direct script access.');

class Model_Auth extends Model_Base {

    protected $_table_name  = 'auth'; // default: accounts
    protected $_primary_key = 'id';      // default: id
    //protected $_primary_val = 'strange_name';      // default: name (column used as primary value)

    protected $_table_columns = array(
        'id'   => array('data_type' => 'int',    'is_nullable' => FALSE),
        'user_name'  => array('data_type' => 'string', 'is_nullable' => FALSE),
        'mail_address'  => array('data_type' => 'string', 'is_nullable' => FALSE),
        'password'  => array('data_type' => 'string', 'is_nullable' => FALSE),
        'auth_tokens'  => array('data_type' => 'string', 'is_nullable' => FALSE),
        'created_at'  => array('data_type' => 'string', 'is_nullable' => FALSE),
        'last_login_at'  => array('data_type' => 'string', 'is_nullable' => TRUE),
    );


    protected $_forms = array(
	"user_name"       =>   "",
	"mail_address"    =>   "",
	"password"        =>   "",
	"password_confirm" =>  "",
    );

    
    public function get_forms($post = array())
    {
	if (!empty($post)) {
	    $this->_forms = array_merge($this->_forms,$post);
	}
	return $this->_forms;
    }


    public function validate_create($postvalues)
    {
	$array = Validate::factory($postvalues)
			->rules('password', $this->_rules['password'])
			->rules('user_name', $this->_rules['user_name'])
			->rules('mail_address', $this->_rules['mail_address'])
			->rules('password_confirm', $this->_rules['password_confirm'])
			->filter('user_name', 'trim')
			->filter('mail_address', 'trim')
			->filter('password', 'trim')
			->filter('password_confirm', 'trim');

            foreach ($this->_callbacks as $field => $callbacks)
            {
		foreach ($callbacks as $callback){
		    $array->callback($field, array($this, $callback));
		}
	    }

	    return $array;

    }

    public function login_validate_create($postvalues)
    {
	$this->_rules = array(
	    'mail_address' => array('not_empty' => NULL),
	    'password'     => array('not_empty' => NULL),
	);

	$array = Validate::factory($postvalues)
			->rules('password', $this->_rules['password'])
			->rules('mail_address', $this->_rules['mail_address'])
			->filter('mail_address', 'trim')
			->filter('password', 'trim');

	foreach ($this->_login_callbacks as $field => $callbacks)
	{
	    foreach ($callbacks as $callback){
		$array->callback($field, array($this, $callback));
	    }
	}
	
	return $array;
    }

}

