
DROP TABLE IF NOT EXISTS `categorys`
CREATE TABLE IF NOT EXISTS `categorys` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `dir_name` varchar(22) NOT NULL DEFAULT '',
  `regist_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF NOT EXISTS `contents`
CREATE TABLE IF NOT EXISTS `contents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) unsigned NOT NULL,
  `name` varchar(32) NOT NULL,
  `image_id` int(11) NOT NULL,
  `dir_name` varchar(22) NOT NULL DEFAULT '',
  `status` int(2) unsigned NOT NULL DEFAULT '0',
  `regist_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF NOT EXISTS `content_images`
CREATE TABLE IF NOT EXISTS `content_images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content_id` int(11) unsigned NOT NULL,
  `filepath` varchar(100) DEFAULT NULL,
  `width` varchar(4) NOT NULL DEFAULT '',
  `height` varchar(4) NOT NULL DEFAULT '',
  `alt` varchar(100) DEFAULT NULL,
  `regist_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF NOT EXISTS `images`
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content_id` int(11) unsigned NOT NULL,
  `filepath` varchar(100) DEFAULT NULL,
  `width` varchar(4) NOT NULL DEFAULT '',
  `height` varchar(4) NOT NULL DEFAULT '',
  `alt` varchar(100) DEFAULT NULL,
  `regist_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
