<?php defined('SYSPATH') or die('No direct script access.');

return array(
	'password' => array(
		'not_empty' => 'パスワードを入力して下さい',
		'min_length' => '6文字以上で入力して下さい',
		'max_length' => '42文字以下で入力して下さい',
		'regex'      => 'パスワードの書式が正しくありません',
	),
	'password_confirm' => array(
		'not_empty' => 'パスワードを再入力して下さい',
		'matches' => 'パスワードが一致しません',
	),
	'email' => array(
		'not_empty' => 'メールアドレスを入力して下さい',
		'min_length' => '4文字以上で入力して下さい',
		'max_length' => '127文字以下で入力して下さい',
		'validate::email' => 'メールアドレスまたはパスワードが違います',
		'invalid'  => 'メールアドレスまたはパスワードが違います',
	),
);
