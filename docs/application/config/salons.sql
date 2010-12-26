
DROP TABLE IF NOT EXISTS `categorys`
CREATE TABLE IF NOT EXISTS `categorys` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `dir_name` varchar(22) NOT NULL DEFAULT '',
  `regist_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF NOT EXISTS `works`
CREATE TABLE IF NOT EXISTS `works` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) unsigned NOT NULL,
  `name` varchar(32) NOT NULL,
  `logo_image` varchar(100) NOT NULL DEFAULT '',
  `dir_name` varchar(22) NOT NULL DEFAULT '',
  `regist_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF NOT EXISTS `images`
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `work_id` int(11) unsigned NOT NULL,
  `file_name` varchar(32) NOT NULL,
  `dir_name` varchar(32) NOT NULL,
  `regist_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
