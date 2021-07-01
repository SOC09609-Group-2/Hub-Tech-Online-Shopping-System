-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2021 at 02:05 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hub_tech`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `view_order_detail` (IN `v_day` INT)  NO SQL
BEGIN

IF EXISTS (SELECT * FROM m_attendance WHERE m_attendance.MA_Date=v_day) THEN
DELETE FROM m_attendance WHERE m_attendance.MA_Date=v_day;
INSERT INTO m_attendance(Salesman_Code,Total_Present,Total_Leave, Total_Late,Leave_Fine,Late_Fine,Total_Fine,MA_Month,MA_Date)

select 
smid,
COUNT(rollcall),
COUNT(D_leave),
          COUNT(D_late),
          sum(leave_fine),
          sum(late_fine),
          sum(total_fine),
          Month,
          D_date
          
          from attendance
          where D_date=v_day
          group by smid,D_leave,D_Late,rollcall;


  ELSE

INSERT INTO m_attendance(Salesman_Code,Total_Present,Total_Leave, Total_Late,Leave_Fine,Late_Fine,Total_Fine,MA_Month,MA_Date)

select 
smid,
COUNT(rollcall),
COUNT(D_leave),
          COUNT(D_late),
          sum(leave_fine),
          sum(late_fine),
          sum(total_fine),
          Month,
          D_date
          
          from attendance
          where D_date=v_day 
          group by smid,D_leave,D_Late,rollcall;

END IF;
  
        

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `name` varchar(23) DEFAULT NULL,
  `image_name` varchar(220) DEFAULT NULL,
  `pslug` varchar(200) NOT NULL,
  `text` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `name`, `image_name`, `pslug`, `text`, `created_at`, `updated_at`) VALUES
(1, 'Catherine', '2021070114551c14ef3578336745957fd68079315cf3.jpg', 'ca00dfcbfdad69346619eaa65b96b4b81', 'Hi\n', '2021-07-01 17:50:33', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `sender_id`, `receiver_id`, `text`, `created_at`, `updated_at`) VALUES
(1, 3, 2, 'Hi', '2021-07-01 16:12:41', NULL),
(2, 3, 1, 'Hi', '2021-07-01 16:15:16', NULL),
(3, 3, 1, 'Hello', '2021-07-01 16:16:21', NULL),
(4, 2, 3, 'Hello', '2021-07-01 18:23:41', NULL),
(5, 3, 2, '?', '2021-07-01 18:24:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'How can I order', 'You can order easily using our online platform. When you find a product you need, you can add it to cart, login and go through the ordering process. After the order is ready, you will receive order summary to your email. Order summary will also be stored to your account.\n', '202107011501', '2021-07-01 21:31:35', '2021-07-01 15:07:51'),
(2, 'Why should I buy online?', 'Speeding up the process. By ordering online you will you will get prices faster and you will be able to go through order confirmation and payment process much faster. This could save days of your time.', '202107011502', '2021-07-01 15:02:32', NULL),
(3, 'What information should I input when ordering?', ' Our online ordering system will ask for all the important information you should submit. If you have a VAT number, please remember to submit it. This will make sure the shipment is not delayed because of the lack of VAT number', '202107011502', '2021-07-01 15:02:51', NULL),
(4, 'What payment methods can I use?', 'You can use all the major credit cards.\n\nIf you are a customer with established customer relationship with HyTest Ltd. you are able to use invoice as a payment method on our online shopping checkout process.  If invoicing option is not activated for you although you are repeated customer, please contact hytest@hytest.fi and notify us.\n', '202107011503', '2021-07-01 15:03:15', NULL),
(5, 'How do create an account?', 'Go to this page register and click “create a new account”, then just fill in all the needed information and click “create”.  After submitting the form, your account will be confirmed and you will be notified.', '202107011504', '2021-07-01 15:04:00', NULL),
(6, 'How do I change my personal details or email address?', 'You can easily change all your information on your account.  Go to profile page and log in, then click “my account” and “edit”. Here you can change all your contact information.', '202107011504', '2021-07-01 15:04:34', NULL),
(7, '​Do you sell quality products?', 'Define Instruments products are designed and manufactured in New Zealand according to rigorous quality standards. We are an established company and our products have been field-tested for more than 15 years.', '202107011505', '2021-07-01 15:05:52', NULL),
(8, 'What is your returns policy?', 'Define Instruments will accept product returns for credit or exchange up to 30 DAYS after the dispatch date, provided that the returned product(s) are unused, and in original condition - complete with original documents and packaging.', '202107011506', '2021-07-01 15:06:10', NULL),
(9, 'Can I get a refund for my shipping costs?', 'We will refund your shipping costs if the product was received due to an error on our part. For change-of-mind returns, and any other return reason that is not due to an error on our part, we do not refund shipping charges.', '202107011506', '2021-07-01 15:06:33', NULL),
(10, 'When will my \'Pre-Order\' be dispatched?', 'Our website generates low stock notifications and automatically sends them through to our operations team, so there\'s a good chance that more stock is already on its way.', '202107011506', '2021-07-01 15:06:54', NULL),
(11, 'Can I change my delivery address?', 'Your delivery information is sent to UPS immediately after your payment is processed, so it\'s difficult to change this after your order has been placed. Please enter your address details carefully!', '202107011507', '2021-07-01 15:07:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `main_categories`
--

CREATE TABLE `main_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `main_categories`
--

INSERT INTO `main_categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Keyboard', NULL, NULL, '2021-07-01 17:59:29'),
(2, 'Mouse', '202107011509', '2021-07-01 15:09:41', NULL),
(3, 'Phone', '202107011510', '2021-07-01 15:10:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `customer_slug` varchar(100) DEFAULT NULL,
  `order_no` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `customer_slug`, `order_no`, `date`, `created_at`, `updated_at`) VALUES
(1, '202107011455', '202107011746', '2021-07-01', '2021-07-01 17:46:36', NULL),
(2, '202107011455', '202107011751', '2021-07-01', '2021-07-01 17:51:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment_details`
--

CREATE TABLE `payment_details` (
  `id` int(11) NOT NULL,
  `customer_slug` varchar(100) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(40) DEFAULT NULL,
  `unit_price` float DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `month` varchar(40) DEFAULT NULL,
  `year` varchar(40) DEFAULT NULL,
  `date` varchar(111) DEFAULT NULL,
  `order_no` varchar(100) DEFAULT NULL,
  `order_status` varchar(222) DEFAULT 'Order Processed',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_details`
--

INSERT INTO `payment_details` (`id`, `customer_slug`, `supplier_id`, `payment_id`, `qty`, `product_id`, `product_name`, `unit_price`, `total_price`, `month`, `year`, `date`, `order_no`, `order_status`, `created_at`, `updated_at`) VALUES
(1, '202107011455', 2, 1, 2, 8, 'Zowie EC1', 300, 600, '7', '2021', '2021-07-01', '202107011746', 'Order Processed', '2021-07-01 17:46:36', NULL),
(2, '202107011455', 2, 1, 1, 1, 'Razer BlackWidow Elite', 169.99, 169.99, '7', '2021', '2021-07-01', '202107011746', 'Order Processed', '2021-07-01 17:46:36', NULL),
(3, '202107011455', 2, 1, 1, 7, 'Razer Pro Type', 139.99, 139.99, '7', '2021', '2021-07-01', '202107011746', 'Order Processed', '2021-07-01 17:46:36', NULL),
(4, '202107011455', 2, 1, 1, 9, 'Zowie EC1 White', 310, 310, '7', '2021', '2021-07-01', '202107011746', 'Order Processed', '2021-07-01 17:46:36', NULL),
(5, '202107011455', 2, 1, 1, 2, 'Razer BlackWidow V3', 139.99, 139.99, '7', '2021', '2021-07-01', '202107011746', 'Order Processed', '2021-07-01 17:46:36', NULL),
(6, '202107011455', 2, 1, 1, 5, 'Razer Huntsman Mini', 119.99, 119.99, '7', '2021', '2021-07-01', '202107011746', 'Order Processed', '2021-07-01 17:46:36', NULL),
(7, '202107011455', 2, 2, 1, 2, 'Razer BlackWidow V3', 139.99, 139.99, '7', '2021', '2021-07-01', '202107011751', 'Order Packing', '2021-07-01 17:51:26', NULL),
(8, '202107011455', 2, 2, 2, 1, 'Razer BlackWidow Elite', 169.99, 339.98, '7', '2021', '2021-07-01', '202107011751', 'Order Packing', '2021-07-01 17:51:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `sub_cat_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image_name` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `cat_id`, `sub_cat_id`, `supplier_id`, `slug`, `content`, `image_name`, `created_at`, `updated_at`) VALUES
(1, 'Razer BlackWidow Elite', 169.99, 1, 1, 2, 'ca00dfcbfdad69346619eaa65b96b4b81', 'The Complete Mechanical Gaming Keyboard price is 169.99. \n-An Evolved Mechanical Switch.\n-Tournament-Grade Precision.\n-Unleash Extended Controls With the Multi-Function Digital Dial.', '202107011515https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h6f_hdb_9011284148254_razer-blackwidow-elite-gallery-03.jpg,202107011515https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h46_h7a_9011287883806_blackwidow-elite-gallery-hero-1500x1000.jpg,202107011515https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h55_h61_9011293716510_razer-blackwidow-elite-gallery-04.jpg', '2021-07-01 15:18:08', NULL),
(2, 'Razer BlackWidow V3', 139.99, 1, 1, 2, 'ca00dfcbfdad69346619eaa65b96b4b82', 'Razer BlackWidow V3 - Green Switch - US - Quartz\nMechanical Gaming Keyboard with Razer Chroma RGB', '202107011525https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h57_h94_9089910833182_razer-blackwidow-v3-quart-1500x1000_1.jpg,202107011525https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h85_h45_9089911062558_razer-blackwidow-v3-quart-1500x1000_2.jpg,202107011525https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h98_h90_9089910964254_razer-blackwidow-v3-quart-1500x1000_5.jpg', '2021-07-01 15:25:09', NULL),
(3, 'Razer BlackWidow V3 Tenkeyless', 99.99, 1, 1, 2, 'ca00dfcbfdad69346619eaa65b96b4b83', 'Razer BlackWidow V3 Tenkeyless - Green Switch - US\nCompact Mechanical keyboard with Razer Chroma RGB', '202107011528https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h2a_h95_9093698551838_rzr-blackwidow-v3-tenkeyless-2_1500x100-0.jpg,202107011528https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h93_h95_9093698519070_rzr-blackwidow-v3-tenkeyless-2_1500x100-2.jpg,202107011528https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_hd2_h94_9093698584606_rzr-blackwidow-v3-tenkeyless-2_1500x100-1.jpg', '2021-07-01 15:28:28', NULL),
(4, 'Razer Huntsman Elite', 199.99, 1, 1, 2, 'ca00dfcbfdad69346619eaa65b96b4b84', 'Razer Huntsman Elite - Linear Optical Switch - US\nGaming Keyboard with Razer™ Optical Switches', '202107011536https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h4c_h05_9011294306334_Razer-Huntsman-Elite-gallery-hero.jpg,202107011536https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h7e_hac_9011301908510_razer-huntsman-elite-gallery05.jpg,202107011536https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h52_hc3_9011284869150_razer-huntsman-elite-gallery02.jpg', '2021-07-01 15:36:14', NULL),
(5, 'Razer Huntsman Mini', 119.99, 1, 1, 2, 'ca00dfcbfdad69346619eaa65b96b4b85', 'Razer Huntsman Mini - Clicky Optical Switch - US - Black\n60% Gaming Keyboard with Razer™ Optical Switch', '202107011537https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h1b_ha6_9066498687006_huntsman-mini-black-2.jpg,202107011537https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h32_haa_9066498523166_huntsman-mini-black-1.jpg,202107011537https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h43_had_9066498457630_huntsman-mini-black-3.jpg', '2021-07-01 15:37:47', NULL),
(6, 'Razer Ornata Chroma', 99.99, 1, 1, 2, 'ca00dfcbfdad69346619eaa65b96b4b86', 'Razer Ornata Chroma - US\nSoft Touch. Tactile Click Gaming Keyboard.', '202107011538https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h8d_h53_9011298631710_ornata-chroma-gallery-3.jpg,202107011538https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h62_h51_9011282182174_ornata-chroma-gallery-hero.jpg,202107011538https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h84_hd8_9011296600094_ornata-chroma-gallery-5.jpg', '2021-07-01 15:38:40', NULL),
(7, 'Razer Pro Type', 139.99, 1, 1, 2, 'ca00dfcbfdad69346619eaa65b96b4b87', 'Razer Pro Type - US\nWireless mechanical keyboard for productivity', '202107011539https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h43_hb4_9078199877662_razer-pro-type-1500x1000-gallery-01-hero.jpg,202107011539https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h68_hbe_9078199582750_razer-pro-type-1500x1000-gallery-05.jpg,202107011539https___hybrismediaprod.blob.core.windows.net_sys-master-phoenix-images-container_h89_hb1_9078199910430_razer-pro-type-1500x1000-gallery-02.jpg', '2021-07-01 15:39:19', NULL),
(8, 'Zowie EC1', 300, 2, 2, 2, 'ca00dfcbfdad69346619eaa65b96b4b88', 'The New EC Series comes in two sizes to fulfill different needs. \nAccording to our feedback from the players and our fans, ZOWIE had added the big mousefeet back to the EC Series. \nThe Difference between EC and EC-B series, are mainly the mousefeet, which provide precise overall traction and tracking/gliding feeling. \nThe ergonomic design exclusively for right-handed users. It offers users a bigger room for wrist movements. \nThe shape of the right side of the mouse is well rounded. It allows the user’s fingertips to hold/cover the mouse to move smoothly.', '202107011540ec1-01-top.png,202107011540ec1-02-bottom.png,202107011540ec1-03-back-left45.png', '2021-07-01 15:40:44', NULL),
(9, 'Zowie EC1 White', 310, 2, 2, 2, 'ca00dfcbfdad69346619eaa65b96b4b89', 'The New EC Series comes in two sizes to fulfill different needs. According to our feedback from the players and our fans, ZOWIE had added the big mousefeet back to the EC Series. The Difference between EC and EC-B series, are mainly the mousefeet, which provide precise overall traction and tracking/gliding feeling. The ergonomic design exclusively for right-handed users. It offers users a bigger room for wrist movements. The shape of the right side of the mouse is well rounded. It allows the user’s fingertips to hold/cover the mouse to move smoothly.\n', '20210701154101-ec1-white-top.png,20210701154103-ec1-white-button.png,20210701154104-ec1-white-left45.png', '2021-07-01 15:41:58', NULL),
(10, 'iPhone 11', 900, 3, 3, 2, 'ca00dfcbfdad69346619eaa65b96b4b810', 'This is iphone 11', '202107011549iphone 11.jpg,202107011549Apple-iPhone-11-Pro-64GB-Space-Grey-e1579624032695.jpg,202107011549unnamed.png', '2021-07-01 15:49:40', NULL),
(11, 'Note8', 600, 3, 4, 2, 'ca00dfcbfdad69346619eaa65b96b4b811', 'Note8', 'whitenote9_news.jpg', '2021-07-01 15:53:22', NULL),
(12, 'Zowie EC2', 400, 2, 2, 2, '202107011739', 'The New EC Series comes in two sizes to fulfill different needs.\nAccording to our feedback from the players and our fans, ZOWIE had added the big mousefeet back to the EC Series.\nThe Difference between EC and EC-B series, are mainly the mousefeet, which provide precise overall traction and tracking/gliding feeling. \nThe ergonomic design exclusively for right-handed users. \nIt offers users a bigger room for wrist movements. The shape of the right side of the mouse is well rounded. \nIt allows the user’s fingertips to hold/cover the mouse to move smoothly.\n', '202107011739ec2-01-top.png,202107011739ec2-02-bottom.png,202107011739ec2-06-right.png', '2021-07-01 17:39:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `mcat` int(11) DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `name`, `mcat`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Razer', 1, '202107011509', '2021-07-01 15:09:24', NULL),
(2, 'Zowie ', 2, '202107011510', '2021-07-01 15:10:10', NULL),
(3, 'iPhone', 3, '202107011510', '2021-07-01 15:10:43', NULL),
(4, 'Sansumg', 3, '202107011511', '2021-07-02 04:11:20', '2021-07-01 17:59:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `email` varchar(70) NOT NULL,
  `slug` varchar(70) NOT NULL,
  `address` varchar(70) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `role` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL,
  `shop_name` varchar(100) DEFAULT NULL,
  `image_name` varchar(70) NOT NULL,
  `dob` date DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `slug`, `address`, `gender`, `role`, `status`, `shop_name`, `image_name`, `dob`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Jhon', 'hubtech2022@gmail.com', '202107011450', 'No. 11/B, Than Lwin Road, Bahan Township,  Yangon.', 'male', 'admin', 'active', 'Jhon', '202107011450ERpPlkLU4AA1ZDA.jpg', '1969-01-01', 'c0ab7d60a00112371f8399c1a2a14ec906f71076f5069f3bbfe0029738b14177d551682ab630c94b69e6fad685ee83a100e38c0a8e4e31b306cdd2c85c82ce9f', '2021-07-01 14:50:19', NULL),
(2, 'Robin', 'robin@gmail.com', '202107011440', 'No. 88, Strand Road, Kyauktada Township, Yangon, Myanmar', '-------', 'shopkeeper', 'active', 'Unique', '20210701144568906651_2817328408296627_5545369074868944896_n.jpg', NULL, 'c0ab7d60a00112371f8399c1a2a14ec906f71076f5069f3bbfe0029738b14177d551682ab630c94b69e6fad685ee83a100e38c0a8e4e31b306cdd2c85c82ce9f', '2021-07-01 14:40:21', NULL),
(3, 'Catherine', 'maisoneka@gmail.com', '202107011455', 'No. 42, May Road, Hlaing Township, Yangon, Myanmar', 'male', 'customer', 'active', '-------', '2021070114551c14ef3578336745957fd68079315cf3.jpg', '1996-02-15', 'c0ab7d60a00112371f8399c1a2a14ec906f71076f5069f3bbfe0029738b14177d551682ab630c94b69e6fad685ee83a100e38c0a8e4e31b306cdd2c85c82ce9f', '2021-07-01 14:55:02', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `main_categories`
--
ALTER TABLE `main_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_details`
--
ALTER TABLE `payment_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `main_categories`
--
ALTER TABLE `main_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_details`
--
ALTER TABLE `payment_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
