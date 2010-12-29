
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
  `logo_image_id` int(11) unsigned NULL,
  `name` varchar(32) NOT NULL,
  `dir_name` varchar(22) NULL,
  `status` int(2) unsigned NOT NULL DEFAULT 0,
  `regist_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF NOT EXISTS `logo_images`
CREATE TABLE IF NOT EXISTS `logo_images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `filepath` varchar(100) NULL,
  `width` varchar(4) NOT NULL DEFAULT '',
  `height` varchar(4) NOT NULL DEFAULT '',
  `alt` varchar(100) NULL,
  `regist_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
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
