<?php defined('SYSPATH') or die('No direct script access.');?>
<h1>ポートフォリオメンバー登録</h1>
<?php echo form::open('account/confirm_contents',array('method'=>'post')); ?>
<?php echo form::hidden("regist","1"); ?>
<table border="0">
<tr>
<td>ユーザー名</td>
<td><?php echo $post['username']; ?></td>
</tr>
<tr>
<td>メールアドレス</td>
<td><?php echo $post['email']; ?></td>
</tr>
<tr>
<td>パスワード</td>
<td><?php echo $post['password']; ?></td>
</tr>
<tr>
<td colspan="2"><?php echo form::submit('submit','送信'); ?>
</table>
<?php echo form::close(); ?>
