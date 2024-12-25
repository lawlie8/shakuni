
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



DROP TABLE IF EXISTS `configured_datasource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configured_datasource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datasource_name` varchar(200) NOT NULL,
  `datasource_description` varchar(400) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `datasource_type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `datasource_name_UNIQUE` (`datasource_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Saved DataSources by User';
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `datasource_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datasource_properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `configured_datasource_id` int(11) DEFAULT NULL,
  `prop_key` varchar(200) DEFAULT NULL,
  `prop_value` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `configured_datasource_id` (`configured_datasource_id`),
  CONSTRAINT `datasource_properties_ibfk_1` FOREIGN KEY (`configured_datasource_id`) REFERENCES `configured_datasource` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `datasource_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



LOCK TABLES `datasource_type` WRITE;
/*!40000 ALTER TABLE `datasource_type` DISABLE KEYS */;
INSERT INTO `datasource_type` VALUES (1,'maria_db',1,'10.10.2-MariaDB',1,'3.3.3','/datasource_logo/mariadb_logo.svg','https://mariadb.org/','Maria Db'),(2,'postgres_sql',1,'16',1,'42.7.4','/datasource_logo/postgresql_logo.svg','https://www.postgresql.org','Postgres Sql'),(3,'mysql',1,'8.4.3',1,'9.1.0','/datasource_logo/mysql_logo.png','https://www.mysql.com/','MySQL'),(4,'apache_hive',1,'4.0.1',1,'4.0.1','/datasource_logo/hive_logo.svg','https://hive.apache.org/','Apache Hive'),(5,'db2',1,'12.1',1,'12.1.0.0','/datasource_logo/db2_logo.svg','https://www.ibm.com/db2','Db2'),(6,'oracle',1,'21C',1,'23.6.0.24.10','/datasource_logo/oracle_logo.svg','https://www.oracle.com/database/','Oracle');
/*!40000 ALTER TABLE `datasource_type` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `permission_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(100) NOT NULL,
  `permission_description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permission_list_unique` (`permission_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Contains all the permissions present in App';
/*!40101 SET character_set_client = @saved_cs_client */;



LOCK TABLES `permission_list` WRITE;
/*!40000 ALTER TABLE `permission_list` DISABLE KEYS */;
INSERT INTO `permission_list` VALUES (1,'VIEW_DASHBOARD','Permission to View DashBoard Page'),(2,'VIEW_JOBS','Permission To View Jobs Page'),(3,'VIEW_CONFIG','Permission To View Config Page'),(4,'VIEW_MANAGEMENT','Permission To View Mangement Page'),(5,'VIEW_DATASOURCE','Permission To View DataSource Page'),(6,'VIEW_USER_SETTINGS','Permission To View User Settings Page');
/*!40000 ALTER TABLE `permission_list` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Roles Described for User are stored Here';
/*!40101 SET character_set_client = @saved_cs_client */;



LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_unique` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Table Contains User Roles';
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_ADMIN','admin',NULL),(2,'ROLE_USER','admin',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) DEFAULT NULL,
  `password_hash` varchar(200) DEFAULT NULL,
  `is_default_user` tinyint(1) DEFAULT 0,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@lawlie8.org','$2y$10$y34b0AseSv3ogDaeoxvTEu8ne1z69oZcnAfKBgECfMd7oPpuDnazC',1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

CREATE TABLE `jobs` (
	`id` INTEGER auto_increment NOT NULL,
	`job_name` varchar(200) NOT NULL,
	`configured_datasource_id` INTEGER NOT NULL,
	`created_by` varchar(200) NULL,
	`creation_date` DATETIME NULL,
	CONSTRAINT jobs_pk PRIMARY KEY (`id`),
	CONSTRAINT jobs_unique UNIQUE KEY (`job_name`)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci
COMMENT='Table Consists of Data Regarding Shakuni Jobs';

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `task_name` varchar(200) NOT NULL,
  `file_path` varchar(2000) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `created_by` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tasks_unique` (`task_name`),
  KEY `tasks_jobs_FK` (`job_id`),
  CONSTRAINT `tasks_jobs_FK` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COL