<?php defined('SYSPATH') or die('no direct script access.'); ?>

<p>ページ一覧</p>

<p>カテゴリで絞る</td>
<form>
<select name="category_id">
<option value="0">選択して下さい</option>
</select>
</form>

<p>ページ検索</p>
<form>
<input type="text" name="page_search" value="" />
</form>

<table border="0">
<tr>
<th>ページID</th>
<th>ページ名</th>
<th>ページURL</th>
<th>ロゴイメージ</th>
<th>操作</th>
</tr>
</table>
