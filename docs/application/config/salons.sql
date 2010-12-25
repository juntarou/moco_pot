CREATE TABLE IF NOT EXISTS `auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(23) NOT NULL,
  `mail_address` varchar(55) NOT NULL,
  `password` varchar(23) NOT NULL,
  `auth_tokens` varchar(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_login_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
