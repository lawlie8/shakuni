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

CREATE TABLE `datasource_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_source_type` varchar(200) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `datasource_version` varchar(200) NOT NULL,
  `is_default_driver` tinyint(1) DEFAULT NULL,
  `driver_version` varchar(200) DEFAULT NULL,
  `datasource_img_url` varchar(200) DEFAULT NULL,
  `datasource_site` varchar(200) DEFAULT NULL,
  `datasource_label` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `datasource_label_UNIQUE` (`datasource_label`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci

INSERT INTO `datasource_type` (
`id`,
`data_source_type`,
`is_active`,
`datasource_version`,
`is_default_driver`,
`driver_version`,
`datasource_img_url`,
`datasource_site`,
`datasource_label`) VALUES (
'1',
'maria_db',
'1',
'10.10.2-MariaDB',
'1',
'3.3.3',
'/datasource_logo/mariadb_logo.svg',
'https://mariadb.org/',
'Maria Db');

INSERT INTO `datasource_type` (
`id`,
`data_source_type`,
`is_active`,
`datasource_version`,
`is_default_driver`,
`driver_version`,
`datasource_img_url`,
`datasource_site`,
`datasource_label`) VALUES (
'2',
'postgres_sql',
'1',
'16',
'1',
'42.7.4',
'/datasource_logo/postgresql_logo.svg',
'https://www.postgresql.org',
'Postgres Sql');


CREATE TABLE `configured_datasource` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `datasource_name` VARCHAR(200) NOT NULL,
  `datasource_description` VARCHAR(400) NULL,
  `created_by` VARCHAR(100) NULL,
  `creation_date` DATETIME NULL,
  `datasource_type` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `datasource_name_UNIQUE` (`datasource_name` ASC) VISIBLE)
COMMENT = 'Saved DataSources by User';

INSERT INTO `datasource_type` (
`id`,
`data_source_type`,
`is_active`,
`datasource_version`,
`is_default_driver`,
`driver_version`,
`datasource_img_url`,
`datasource_site`,
`datasource_label`) VALUES (
'3',
'mysql',
'1',
'8.4.3',
'1',
'9.1.0',
'/datasource_logo/mysql_logo.png',
'https://www.mysql.com/',
'MySQL');


CREATE TABLE `datasource_properties`(
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `configured_datasource_id` INT,
    `prop_key` VARCHAR(200),
    `prop_value` VARCHAR(1000),
 FOREIGN KEY (`configured_datasource_id`)
 REFERENCES `configured_datasource`(`id`));

INSERT INTO `datasource_type`(
`id`,
`data_source_type`,
`is_active`,
`datasource_version`,
`is_default_driver`,
`driver_version`,
`datasource_img_url`,
`datasource_site`,
`datasource_label``) VALUES(
4,
'apache_hive',
1,
'4.0.1',
1,
'4.0.1',
'/datasource_logo/hive_logo.svg',
'https://hive.apache.org/',
'Apache Hive');

CREATE TABLE `permissions` (
	`id` INT auto_increment NOT NULL,
	`user_id` INT NOT NULL,
	`permission_name` varchar(200) NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci
COMMENT='Roles Described for User are stored Here';

INSERT INTO `datasource_type` (
`id`,
`data_source_type`,
`is_active`,
`datasource_version`,
`is_default_driver`,
`driver_version`,
`datasource_img_url`,
`datasource_site`,
`datasource_label`) VALUES(
5,
'db2',
1,
'12.1',
1,
'12.1.0.0',
'/datasource_logo/db2_logo.svg',
'https://www.ibm.com/db2',
'Db2');


