<?php defined('SYSPATH') or die('No direct script access.');

abstract class Image extends Kohana_Image {

    protected static $ext_types = array(
	"image/jpeg"    =>    ".jpg",
	"image/gif"     =>    ".gif",
	"image/png"     =>    ".png",
    );


    protected $_ext = null;


    protected $_file_name = null;


    protected $_file_path = null;


    protected $_upload_path = DEFAULT_IMAGE_UPLOAD_DIR_PATH;


    protected $_file_prefix = DEFAULT_IMAGE_FILE_PREFIX;


    protected $_image_id = null;


    protected $_alt = "";


    public function __construct($file) {

	if (is_array($file)) {

	    $this->_files = $file;
	    $file = $file['tmp_name'];

	}

	parent::__construct($file);

    }


    public static function factory($file, $driver = NULL)
    {
	return parent::factory($file);
    }


    public function init($image_id, $alt = NULL, $option = array())
    {

	if (!empty($option)) {

	    if (isset($option['path'])) {
		$this->_upload_path = $option['path'];
	    }

	    if (isset($option['prefix'])) {
		$this->_file_prefix = $option['prefix'];
	    }

	}

	$this->_alt = $alt;
	$this->_image_id = $image_id;
	$this->_ext = $this->get_ext_type($this->mime);
	$this->_file_name = $this->_upload_path . DIRECTORY_SEPARATOR . $this->_file_prefix 
		. $this->_image_id . $this->_ext;
	$this->_file_path = DOCUMENT_ROOT . $this->_file_name;
	
	return $this;
    }

    public function upload_and_save_by_image($object)
    {

	if (is_null($object)) {
	    throw new Kohana_Exception('Not ORM Object undefined',
				array(':file' => Kohana::debug_path($object)));     
	}

	if (Upload::save($this->_files, $this->_file_name, DOCUMENT_ROOT, 0777)) {
	    
	    $object->content_id = $this->_image_id;
	    $object->filepath = $this->_file_name;
	    $object->width = $this->width;
	    $object->height = $this->height;
	    $object->alt = $this->_alt;
	    $object->regist_date = date('Y-m-d h:i:s');
	    $object->save();
	    return $object->id;

	} else {

	    throw new Kohana_Exception('cant save this file',
				array(':file' => Kohana::debug_path($this->_file_path)));
	    return false;
	}
    }


    public static function get_ext_type($type)
    {
	return self::$ext_types[$type];
    }


    public function set_file_name($file_name)
    {
	$this->_file_name = $file_name;
    }
    
    public function set_file_path($file_path)
    {
	$this->_file_path = $file_path;
    }

}
