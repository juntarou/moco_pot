<?php defined('SYSPATH') or die('No direct script access.');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<meta name="author" content="OneStyle" />
<meta name="description" content="" />
<meta name="keywords" content="" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />

<!--read file//-->
<link rel="stylesheet" type="text/css" href="/common/css/base.css" />
<?php if (isset($css_files) && count($css_files) > 0) : ?>
<?php foreach ($css_files as $css) : ?>
<?php echo $css; ?>
<?php endforeach; ?>
<?php endif; ?>
<?php if (isset($js_files) && count($js_files) > 0) : ?>
<?php foreach ($js_files as $js) : ?>
<?php echo $js; ?>
<?php endforeach; ?>
<?php endif; ?>
<!--//read file-->
</head>

<body>
<div id="wrapper">
<?php if (isset($header)) : ?>
<?php echo $header; ?>
<?php endif; ?>
<div id="Main">
<?php if (isset($side_bar)) : ?>
<?php echo $side_ber; ?>
<?php endif; ?>
<?php echo $content; ?>
</div>
<?php if (isset($footer)) : ?>
<?php echo $footer; ?>
<?php endif; ?>
</div>
</body>
</html>
