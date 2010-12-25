<?php defined('SYSPATH') or die('No direct script access.');

class Request extends Kohana_Request {


    private $_post;


    private $_get;


    private $_server;


    private $_put;


    public function __construct($uri)
    {
	parent::__construct($uri);

        if (isset($_POST)) {
            $this->_post = $_POST;
	}

	if (isset($_GET)) {
	    $this->_get = $_GET;
	}

	$this->_server = $_SERVER;
    }


    public function get_post($key = null, $default = null)
    {
	if (is_null($key)) {
	    return $this->_post;
	}

        return isset($this->_post[$key]) ? $this->_post[$key] : $default;	
    }


    public function get_query($key = null, $default = null)
    {
	if (is_null($key)) {
	    return $this->_get;
	}

        return isset($this->_get[$key]) ? $this->_get[$key] : $default;	
    }


    public function get_server($key = null)
    {
	if (is_null($key)) {
	    return $this->_server;
	}
	return isset($this->_server[$key]) ? $this->_server : null;
    }

}
