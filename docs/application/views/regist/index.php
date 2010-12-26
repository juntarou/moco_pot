<?php defined('syspath') or die('no direct script access.');?>
<h1>メンバー登録</h1>
<?php echo form::open('regist/index',array('method'=>'post')); ?>
<table border="0">
<tr>
<td>ユーザー名</td>
<td>
<?php echo form::input('username',$form['username']); ?>
<?php echo $errors['username']; ?>
</td>
</tr>
<tr>
<td>メールアドレス</td>
<td>
<?php echo form::input('email', $form['email']); ?>
<?php echo $errors['email']; ?>
</td>
</tr>
<tr>
<td>パスワード</td>
<td>
<?php echo form::input('password', $form['password']); ?>
<?php echo $errors['password']; ?>
</td>
</tr>
<tr>
<td>パスワード（再入力）</td>
<td>
<?php echo form::input('password_confirm', $form['password_confirm']); ?>
<?php echo $errors['password_confirm']; ?>
</td>
</tr>
<tr>
<td colspan="2"><?php echo form::submit('submit','確認'); ?>
</table>
<?php echo form::close(); ?>

