-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 07, 2022 at 03:55 PM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- CREATE Database: `project_bank`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_details`
--


CREATE Database `project_bank`


DROP TABLE IF EXISTS `account_details`;
CREATE TABLE IF NOT EXISTS `account_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserID` varchar(100) NOT NULL,
  `AccountType` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `AccountNo` varchar(100) NOT NULL,
  `Branch` varchar(100) NOT NULL,
  `IFSCCode` varchar(100) NOT NULL,
  `Card_Type` varchar(100) NOT NULL,
  `Card_account` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `account_details`
--

INSERT INTO `account_details` (`id`, `UserID`, `AccountType`, `AccountNo`, `Branch`, `IFSCCode`, `Card_Type`, `Card_account`) VALUES
(1, 'Selva', 'Saving Account', '786543092', 'Ashok Nagar', 'CDBL0009', 'Saving Account', 'Saving Account'),
(2, 'Selva', 'Current Account', '543092786', 'Ashok Nagar', 'CDBL0009', 'Current Account', 'Current Account'),
(3, 'Selva', 'Credit Account', 'XXXX XXXX XXXX 1255', '', '', 'Visa', 'Card');

-- --------------------------------------------------------

--
-- Table structure for table `pass_book`
--

DROP TABLE IF EXISTS `pass_book`;
CREATE TABLE IF NOT EXISTS `pass_book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Account_ID` int NOT NULL,
  `AccountName` varchar(500) NOT NULL,
  `AccountNo` int NOT NULL,
  `trans_type` varchar(500) NOT NULL,
  `amount_minus` float NOT NULL,
  `amount_add` float NOT NULL,
  `closing_on_trans` float NOT NULL,
  `beneficiary_name` varchar(500) NOT NULL,
  `beneficiary_accno` int NOT NULL,
  `remarks` varchar(500) NOT NULL,
  `trans_Date` date NOT NULL,
  `trans_date_time` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ;

--
-- Dumping data for table `pass_book`
--

INSERT INTO `pass_book` (`id`, `Account_ID`, `AccountName`, `AccountNo`, `trans_type`, `amount_minus`, `amount_add`, `closing_on_trans`, `beneficiary_name`, `beneficiary_accno`, `remarks`, `trans_Date`, `trans_date_time`) VALUES
(1, 1, 'Selvakumar', 786543092, 'Credit', 0, 10000, 10000, 'kathir', 0, 'First Credit', '2022-05-20', '2022-05-20 10:00:00'),
(2, 1, 'Selvakumar', 786543092, 'Debit', 1000, 0, 9000, 'kathir', 55888788, 'Emergency fund', '2022-06-01', '2022-06-01 11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
CREATE TABLE IF NOT EXISTS `user_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) NOT NULL,
  `UserID` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `datetime` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserID` (`UserID`)
) ;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `Username`, `UserID`, `Password`, `datetime`) VALUES
(1, 'Selva Kumar', 'Selva', '1137', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
