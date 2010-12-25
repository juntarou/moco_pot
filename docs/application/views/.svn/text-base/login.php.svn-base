<?php defined('SYSPATH') or die('No direct script access.'); ?>

<div id="contents">
<?php if (!empty($errors)) : ?>
<?php foreach ($errors as $e) : ?>
<?php echo $e; ?>
<?php endforeach; ?>
<?php endif; ?>
<?php echo form::open('front/login',array('method'=>'post')); ?>
<table border="0">
<tr>
<td>メールアドレス</td>
<td><?php echo form::input('email', $form['email']); ?></td>
</tr>
<tr>
<td>パスワード</td>
<td><?php echo form::input('password', $form['password']); ?></td>
</tr>
<tr>
<td colspan="2"><?php echo form::submit('submit','ログイン'); ?>
</tr>
</table>
<?php echo form::close(); ?>
</div>

