<?php defined('SYSPATH') or die('no direct script access.'); ?>

<p>ページ一覧</p>

<p>カテゴリで絞る</td>
<form>
<?php echo form::select('category_id' ,$categorys, $form['category_id']); ?>
</form>

<p>ページ検索</p>
<form>
<input type="text" name="page_search" value="" />
</form>

<table border="0">
<tr>
<th>ページID</th>
<th>カテゴリ</th>
<th>ページ名</th>
<th>ページURL</th>
<th>ロゴイメージ</th>
<th>操作1</th>
<th>操作2</th>
<th>操作3</th>
</tr>
<?php foreach ($contents as $c) : ?>
<tr>
<th><?php echo $c->id; ?></th>
<th><?php echo $c->category->name; ?></th>
<th><?php echo $c->name; ?></th>
<th>ページURL</th>
<th><?php echo html::image($c->contentimage->filepath, array('width' => 70, 'height' => 70, 'alt'=> $c->contentimage->alt)); ?></th>
<th><?php echo html::anchor('account/addimages/?id=' . $c->id , '画像を追加'); ?></th>
<th><?php echo html::anchor('account/edit/?id=' . $c->id, '編集する'); ?></th>
<th><?php echo html::anchor('account/edit/?id=' . $c->id, 'デプロイ'); ?>
</tr>
<?php endforeach; ?>
</table>
