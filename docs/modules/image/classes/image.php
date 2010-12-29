<?php defined('SYSPATH') or die('No direct script access.');

abstract class Image extends Kohana_Image {

    protected static $ext_types = array(
	"image/jpeg"    =>    ".jpg",
	"image/gif"     =>    ".gif",
	"image/png"     =>    ".png",
    );


    public static function get_ext_type($type)
    {
	return self::$ext_types[$type];
    }


}
