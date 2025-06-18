-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: ecomerce
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Marke` varchar(45) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_prd`
--

DROP TABLE IF EXISTS `products_prd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_prd` (
  `id` int DEFAULT NULL,
  `Marke` text,
  `name` text,
  `description` text,
  `price` double DEFAULT NULL,
  `imageUrl` text,
  `category` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_prd`
--

LOCK TABLES `products_prd` WRITE;
/*!40000 ALTER TABLE `products_prd` DISABLE KEYS */;
INSERT INTO `products_prd` VALUES (1,'HERMÃˆS','1992 Ardennes Kelly Sellier 35 schwarz (Tote)','',11170.95,'','Handtasche '),(2,'CHLOÃ‰','Woody Beige (Tote)','',1146.7,'','Handtasche '),(3,'Balenciaga','Hourglass Top Handle XS Shoulder Bag White (Satchel)','',2141.9,'','Handtasche '),(4,'GUCCI','Gucci Jackie Notte Dark Red (Crossbody Bag)','',3193.7,'','Handtasche '),(5,'JACQUEMUS','The Bambino Light Brown (Minitasche)','',620,'','Handtasche '),(6,'SAINT LAURENT','Ysl Le 5A7 Dark Notte (Schultertasche)','',1990,'','Handtasche '),(7,'COACH','Polished Pebble Tab Shoulderbag 26 Bluebell (Crossbody Bag)','',450,'','Handtasche '),(8,'MICHAEL MICHAEL KORS ','Md Chain Pouchette Brown Luggage (Pochette)','',225,'','Handtasche '),(9,'COCCINELLE','Coccinellemagie Soft Royal Blue (Satchel)','',325,'','Handtasche '),(10,'COACH','Polished Pebble Leather Lana Shoulder Bag Maple (Hobo Bag)','',550,'','Handtasche '),(11,'AIGNER','Cybi Burgundy (Crossbody Bag)','',900,'','Handtasche '),(12,'VALENTINO GARAVANI','Antibes Medium Tote Bag Natural (Tote)','',1496.9,'','Handtasche '),(13,'MCM','Liz Vi Shopper Medium Black (Shopper)','',730,'','Handtasche '),(14,'Lauren Ralph Lauren ','Bradley Md-Shoulder Bag-Medium Black (Schultertasche)','',459,'','Handtasche '),(15,'Christian Dior','2020 Mini Satin Crystal Embellished Saddle grau (Schultertasche)','',3370,'','Handtasche '),(16,'ETRO','Boheme Scarf Multicolour mehrfarbig (Wollschal)','',370,'','Schmuck'),(17,'Burberry','Check Gauz Scarf Beige (Leichter Schal)','',489.1,'','Schmuck'),(18,'Gucci','GG Belt Print Cashmere Silk Shawl Beige (Kaschmirschal)','',976,'','Schmuck'),(19,'Dolce&Gabbana','Belt With Logo Black (GÃ¼rtel)','',439.11,'','Schmuck'),(20,'MCM','Claus Visetos Belt 24K Cognac (WendegÃ¼rtel)','',350,'','Schmuck'),(21,'Gucci','Belt Plutone Guccissima Red (LedergÃ¼rtel)','',459.1,'','Schmuck'),(22,'ISABEL MARANT ','Tulum Hat Multicolor (Hut)','',380.8,'','Schmuck'),(23,'GUCCI','Hat Arnaud Bob Beige / Natural (Fischerhut)','',450,'','Schmuck'),(24,'AMI PARIS','Cap mit Logo-Stick Navy (Hut)','',130,'','Schmuck'),(25,'BALENCIAGA','Coin Wallet Leather Black White (MÃ¼nzportemonnaie)','',225,'','Schmuck'),(26,'MICHAEL MICHAEL KORS','Sm Tab Pckt Wllt Black (Bi-Fold Portemonnaie)','',125,'','Schmuck'),(27,'JACQUEMUS','Wallet Light Brown (GeldbÃ¶rse)','',290,'','Schmuck'),(28,'Saint Laurent','SL 692-002 Silver-Silver-Grey (Sonnenbrille)','',375,'','Schmuck'),(29,'Versace','0VE4491U 108/8755 Havana (Sonnenbrille)','',242,'','Schmuck'),(30,'Tiffany & Co.','0TF4230 Black (Sonnenbrille)','',305,'','Schmuck');
/*!40000 ALTER TABLE `products_prd` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17  1:22:31
