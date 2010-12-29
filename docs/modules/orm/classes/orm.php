<?php defined('SYSPATH') or die('No direct script access.');

class ORM extends Kohana_ORM {

    public function get_saved_flag()
    {
	return $this->_saved;
    }

}
