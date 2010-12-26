<?php defined('SYSPATH') or die('No direct access allowed.');


abstract class Kohana_Ajax extends Kohana_Request {


    protected $formats = array(
            'xhtml' => "text/xml",
            'json', => "application/json",
            'xml',  => "text/xml",
            'rss',  => "application/xml",
    );


    public function __construct()
    {

    }


    public function response_ajax($vals)
    {

	if ($format = $this->get_query('format')) {

	    $this->headers['Content-Type'] = $formats[$format];

	    if ($format === "json") {

		return json_encode($vals);	

	    } elseif ($format === "xml") {

	    } elseif ($format === "xhtml") {

	    } elseif ($format === "rss") {

	    }

	}

    }



}
