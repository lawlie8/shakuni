
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



LOCK TABLES `configured_datasource` WRITE;
/*!40000 ALTER TABLE `configured_datasource` DISABLE KEYS */;
INSERT INTO `configured_datasource` VALUES (1,'maraiadbasdd','MariaDB Localhost 3306','admin@lawlie8.org','2024-11-27 09:47:35',1),(2,'MariaDb3','This is Description for Mariadb Testing Database not 2','anonymousUser','2024-11-25 20:35:46',1),(3,'Mysql 1 ','Mysql dataSource','anonymousUser','2024-11-25 20:39:21',3),(4,'Postgres','Postgres Database','admin@lawlie8.org','2024-11-27 10:01:56',2),(5,'Hive','hive datasoirce','admin@lawlie8.org','2024-11-27 10:01:33',4),(6,'Hive Docker Internal','Docker based installation for Hive DataSource','anonymousUser','2024-11-26 17:22:51',4),(7,'Db2',NULL,'anonymousUser','2024-11-27 18:14:46',5),(8,'Oracle',NULL,'anonymousUser','2024-11-27 23:53:07',6);
/*!40000 ALTER TABLE `configured_datasource` ENABLE KEYS */;
UNLOCK TABLES;



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



LOCK TABLES `datasource_properties` WRITE;
/*!40000 ALTER TABLE `datasource_properties` DISABLE KEYS */;
INSERT INTO `datasource_properties` VALUES (1,1,'name','maraiadbasdd'),(2,1,'description','MariaDB Localhost 3306'),(3,1,'host','localhost'),(4,1,'port','3306'),(5,1,'userName','reader'),(6,1,'password','readerpass'),(7,1,'database','shakuni_db'),(8,1,'additionalProperties','TrustCertificate=false;'),(9,2,'name','MariaDb3'),(10,2,'description','This is Description for Mariadb Testing Database not 2'),(11,2,'host','localhost'),(12,2,'port','3306'),(13,2,'userName','reader'),(14,2,'password','readerpass'),(15,2,'database','shakuni_db'),(16,2,'additionalProperties',NULL),(17,3,'name','Mysql 1 '),(18,3,'description','Mysql dataSource'),(19,3,'host','localhost'),(20,3,'port','3306'),(21,3,'userName','reader'),(22,3,'password','readerpass'),(23,3,'database','shakuni_db'),(24,3,'additionalProperties',NULL),(25,4,'name','Postgres'),(26,4,'description','Postgres Database'),(27,4,'host','localhost'),(28,4,'port','5432'),(29,4,'userName','postgres'),(30,4,'password','password'),(31,4,'database','postgres'),(32,4,'additionalProperties',NULL),(33,5,'name','Hive'),(34,5,'description','hive datasoirce'),(35,5,'host','localhost'),(36,5,'port','10000'),(37,5,'userName',' hive'),(38,5,'password','hive'),(39,5,'database','default'),(40,5,'additionalProperties',NULL),(41,6,'name','Hive Docker Internal'),(42,6,'description','Docker based installation for Hive DataSource'),(43,6,'host','localhost'),(44,6,'port','10000'),(45,6,'userName','hive'),(46,6,'password','hive'),(47,6,'database','default'),(48,6,'additionalProperties',NULL),(49,7,'name','Db2'),(50,7,'description',NULL),(51,7,'host','localhost'),(52,7,'port','50000'),(53,7,'userName','db2inst1'),(54,7,'password','password'),(55,7,'database','testdb'),(56,7,'additionalProperties',NULL),(57,8,'name','Oracle'),(58,8,'description',NULL),(59,8,'host','localhost'),(60,8,'port','1521'),(61,8,'userName','system'),(62,8,'password','welcome123'),(63,8,'database',''),(64,8,'additionalProperties',NULL),(65,8,'driverType','thin'),(66,8,'sid','xe');
/*!40000 ALTER TABLE `datasource_properties` ENABLE KEYS */;
UNLOCK TABLES;


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

