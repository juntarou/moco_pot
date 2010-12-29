<?php defined('SYSPATH') or die('No direct script access.');?>
<h1>ページ登録確認</h1>
<?php echo form::open('account/confirm_contents',array('method'=>'post')); ?>
<?php echo form::hidden("regist","1"); ?>
<table border="0">
<tr>
<td>カテゴリ</td>
<td><?php echo $post['category']; ?></td>
</tr>
<tr>
<td>タイトル</td>
<td><?php echo $post['name']; ?></td>
</tr>
<tr>
<td>ロゴイメージ</td>
<td></td>
</tr>
<tr>
<td colspan="2"><?php echo form::submit('submit','送信'); ?>
</table>
<?php echo form::close(); ?>
