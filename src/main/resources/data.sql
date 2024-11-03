CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) DEFAULT NULL,
  `password_hash` varchar(200) DEFAULT NULL,
  `role` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci

CREATE TABLE `persistent_logins` (
  `username` VARCHAR(64) NOT NULL,
  `series` VARCHAR(64) NOT NULL,
  `token` VARCHAR(64) NOT NULL,
  `last_used` TIMESTAMP NOT NULL,
  PRIMARY KEY (`series`));

CREATE TABLE `datasource_type`  (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `data_source_type` varchar(200) NOT NULL,
    `is_active` boolean,
    `version` varchar(200) NOT NULL,
    `is_default_driver` boolean,
    `driver_version` varchar(200),
    PRIMARY KEY (`id`));

INSERT INTO `datasource_type` (
`id`,
`data_source_type`,
`is_active`,
`datasource_version`,
`is_default_driver`,
`driver_version`) VALUES (
'1',
'maria_db',
'1',
'10.10.2-MariaDB',
'1',
'3.3.3');

