<?php defined('SYSPATH') or die('no direct script access.'); ?>

<p>ページ登録</p>

<?php echo form::open('account/regist_contents',array('method'=>'post','enctype' => 'multipart/form-data')); ?>
<table border="0">
<tr>
<td>カテゴリ</td>
<td>
<?php echo form::select('category_id' ,$categorys, $form['category_id']); ?>
<?php echo $errors['category_id']; ?>
</td>
</tr>
<tr>
<td>タイトル<span style="color:red;">* 必須</span></td>
<td>
<?php echo form::input('name', $form['name']); ?>
<?php echo $errors['name']; ?>
</td>
</tr>
<tr>
<td>ロゴイメージ</td>
<td>
<?php echo form::file("logo_image"); ?>
<?php echo $errors['logo_image']; ?>
</td>
</tr>
<tr>
<td colspan="2"><?php echo form::submit('submit','確認'); ?>
</table>
<?php echo form::close(); ?>
