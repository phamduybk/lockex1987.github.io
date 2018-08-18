-- --------------------------------------------------------
-- Host:                         10.30.153.186
-- Server version:               5.6.36 - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table spam_email.classify
CREATE TABLE IF NOT EXISTS `classify` (
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Người dùng',
  `email_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'Email',
  `status` int(2) NOT NULL DEFAULT '0' COMMENT 'Trạng thái (0 - chưa phân loại, 1 - bình thường, 2 - phản động, 3 - mạng xã hội, 4 - quảng cáo, 5 - không chắc chắn)',
  `classify_time` datetime DEFAULT NULL COMMENT 'Thời điểm phân loại',
  PRIMARY KEY (`user_id`,`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Người dùng gán nhãn email';

-- Dumping data for table spam_email.classify: ~24 rows (approximately)
/*!40000 ALTER TABLE `classify` DISABLE KEYS */;
INSERT INTO `classify` (`user_id`, `email_id`, `status`, `classify_time`) VALUES
	(1, 149, 1, '2018-08-10 17:15:08'),
	(1, 150, 5, '2018-08-09 10:49:27'),
	(1, 151, 4, '2018-08-09 10:49:23'),
	(1, 152, 1, '2018-08-09 10:49:21'),
	(1, 153, 1, '2018-08-09 10:49:16'),
	(1, 154, 1, '2018-08-09 10:49:15'),
	(1, 155, 2, '2018-08-09 10:17:33'),
	(1, 156, 2, '2018-08-09 10:17:32'),
	(1, 157, 4, '2018-08-09 10:17:31'),
	(1, 158, 2, '2018-08-09 10:17:29'),
	(1, 159, 1, '2018-08-09 10:17:28'),
	(1, 160, 4, '2018-08-09 10:21:10'),
	(1, 161, 4, '2018-08-09 10:17:21'),
	(1, 162, 3, '2018-08-09 10:17:17'),
	(1, 163, 1, '2018-08-10 17:19:17'),
	(1, 164, 1, '2018-08-10 17:16:50'),
	(2, 95, 4, '2018-08-09 14:08:53'),
	(2, 122, 1, '2018-08-09 14:08:33'),
	(2, 123, 3, '2018-08-09 14:08:36'),
	(2, 124, 4, '2018-08-09 14:08:30'),
	(2, 144, 1, '2018-08-09 13:49:21'),
	(2, 162, 2, '2018-08-09 13:54:08'),
	(2, 163, 2, '2018-08-09 11:42:36'),
	(2, 164, 4, '2018-08-09 13:54:38');
/*!40000 ALTER TABLE `classify` ENABLE KEYS */;

-- Dumping structure for table spam_email.data_group
CREATE TABLE IF NOT EXISTS `data_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID tự tăng',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tên nhóm',
  `total_number` int(10) DEFAULT NULL COMMENT 'Tổng số email',
  `classified_number` int(10) DEFAULT NULL COMMENT 'Số email đã được gán nhãn',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Nhóm dữ liệu';

-- Dumping data for table spam_email.data_group: ~4 rows (approximately)
/*!40000 ALTER TABLE `data_group` DISABLE KEYS */;
INSERT INTO `data_group` (`id`, `name`, `total_number`, `classified_number`) VALUES
	(5, 'Tuần 1', 10000, 9000),
	(6, 'Tuần 2', 10000, 1245),
	(7, 'Tuần 3', 10000, 999),
	(8, 'Tuần 4', 10000, 0);
/*!40000 ALTER TABLE `data_group` ENABLE KEYS */;

-- Dumping structure for table spam_email.email
CREATE TABLE IF NOT EXISTS `email` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID tự tăng',
  `data_group_id` int(10) unsigned DEFAULT NULL COMMENT 'Nhóm dữ liệu',
  `content_type` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Kiểu (text hay html)',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nội dung',
  `status` int(2) NOT NULL DEFAULT '0' COMMENT 'Tổng số email',
  `classify_user` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Người phân loại',
  `classify_time` datetime DEFAULT NULL COMMENT 'Thời điểm phân loại',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table spam_email.email: ~80 rows (approximately)
/*!40000 ALTER TABLE `email` DISABLE KEYS */;
INSERT INTO `email` (`id`, `data_group_id`, `content_type`, `content`, `status`, `classify_user`, `classify_time`) VALUES
	(85, 5, NULL, 'Group 5, email 1', 0, NULL, NULL),
	(86, 5, NULL, 'Group 5, email 2', 0, NULL, NULL),
	(87, 5, NULL, 'Group 5, email 3', 0, NULL, NULL),
	(88, 5, NULL, 'Group 5, email 4', 0, NULL, NULL),
	(89, 5, NULL, 'Group 5, email 5', 0, NULL, NULL),
	(90, 5, NULL, 'Group 5, email 6', 0, NULL, NULL),
	(91, 5, NULL, 'Group 5, email 7', 0, NULL, NULL),
	(92, 5, NULL, 'Group 5, email 8', 0, NULL, NULL),
	(93, 5, NULL, 'Group 5, email 9', 0, NULL, NULL),
	(94, 5, NULL, 'Group 5, email 10', 0, NULL, NULL),
	(95, 5, NULL, 'Group 5, email 11', 4, '2', '2018-08-09 14:08:53'),
	(96, 5, NULL, 'Group 5, email 12', 0, NULL, NULL),
	(97, 5, NULL, 'Group 5, email 13', 0, NULL, NULL),
	(98, 5, NULL, 'Group 5, email 14', 0, NULL, NULL),
	(99, 5, NULL, 'Group 5, email 15', 0, NULL, NULL),
	(100, 5, NULL, 'Group 5, email 16', 0, NULL, NULL),
	(101, 5, NULL, 'Group 5, email 17', 0, NULL, NULL),
	(102, 5, NULL, 'Group 5, email 18', 0, NULL, NULL),
	(103, 5, NULL, 'Group 5, email 19', 0, NULL, NULL),
	(104, 5, NULL, 'Group 5, email 20', 0, NULL, NULL),
	(105, 6, NULL, 'Group 6, email 1', 0, NULL, NULL),
	(106, 6, NULL, 'Group 6, email 2', 0, NULL, NULL),
	(107, 6, NULL, 'Group 6, email 3', 0, NULL, NULL),
	(108, 6, NULL, 'Group 6, email 4', 0, NULL, NULL),
	(109, 6, NULL, 'Group 6, email 5', 0, NULL, NULL),
	(110, 6, NULL, 'Group 6, email 6', 0, NULL, NULL),
	(111, 6, NULL, 'Group 6, email 7', 0, NULL, NULL),
	(112, 6, NULL, 'Group 6, email 8', 0, NULL, NULL),
	(113, 6, NULL, 'Group 6, email 9', 0, NULL, NULL),
	(114, 6, NULL, 'Group 6, email 10', 0, NULL, NULL),
	(115, 6, NULL, 'Group 6, email 11', 0, NULL, NULL),
	(116, 6, NULL, 'Group 6, email 12', 0, NULL, NULL),
	(117, 6, NULL, 'Group 6, email 13', 0, NULL, NULL),
	(118, 6, NULL, 'Group 6, email 14', 0, NULL, NULL),
	(119, 6, NULL, 'Group 6, email 15', 0, NULL, NULL),
	(120, 6, NULL, 'Group 6, email 16', 0, NULL, NULL),
	(121, 6, NULL, 'Group 6, email 17', 0, NULL, NULL),
	(122, 6, NULL, 'Group 6, email 18', 1, '2', '2018-08-09 14:08:33'),
	(123, 6, NULL, 'Group 6, email 19', 3, '2', '2018-08-09 14:08:36'),
	(124, 6, NULL, 'Group 6, email 20', 4, '2', '2018-08-09 14:08:30'),
	(125, 7, NULL, 'Group 7, email 1', 0, NULL, NULL),
	(126, 7, NULL, 'Group 7, email 2', 0, NULL, NULL),
	(127, 7, NULL, 'Group 7, email 3', 0, NULL, NULL),
	(128, 7, NULL, 'Group 7, email 4', 0, NULL, NULL),
	(129, 7, NULL, 'Group 7, email 5', 0, NULL, NULL),
	(130, 7, NULL, 'Group 7, email 6', 0, NULL, NULL),
	(131, 7, NULL, 'Group 7, email 7', 0, NULL, NULL),
	(132, 7, NULL, 'Group 7, email 8', 0, NULL, NULL),
	(133, 7, NULL, 'Group 7, email 9', 0, NULL, NULL),
	(134, 7, NULL, 'Group 7, email 10', 0, NULL, NULL),
	(135, 7, NULL, 'Group 7, email 11', 0, NULL, NULL),
	(136, 7, NULL, 'Group 7, email 12', 0, NULL, NULL),
	(137, 7, NULL, 'Group 7, email 13', 0, NULL, NULL),
	(138, 7, NULL, 'Group 7, email 14', 0, NULL, NULL),
	(139, 7, NULL, 'Group 7, email 15', 0, NULL, NULL),
	(140, 7, NULL, 'Group 7, email 16', 0, NULL, NULL),
	(141, 7, NULL, 'Group 7, email 17', 0, NULL, NULL),
	(142, 7, NULL, 'Group 7, email 18', 0, NULL, NULL),
	(143, 7, NULL, 'Group 7, email 19', 0, NULL, NULL),
	(144, 7, NULL, 'Group 7, email 20', 1, '2', '2018-08-09 13:49:21'),
	(145, 8, NULL, 'Group 8, email 1', 0, NULL, NULL),
	(146, 8, NULL, 'Group 8, email 2', 0, NULL, NULL),
	(147, 8, NULL, 'Group 8, email 3', 0, NULL, NULL),
	(148, 8, NULL, 'Group 8, email 4', 0, NULL, NULL),
	(149, 8, NULL, 'Group 8, email 5', 1, '1', '2018-08-10 17:15:08'),
	(150, 8, NULL, 'Group 8, email 6', 5, '1', '2018-08-09 10:49:27'),
	(151, 8, NULL, 'Group 8, email 7', 4, '1', '2018-08-09 10:49:23'),
	(152, 8, NULL, 'Group 8, email 8', 1, '1', '2018-08-09 10:49:21'),
	(153, 8, NULL, 'Group 8, email 9', 1, '1', '2018-08-09 10:49:16'),
	(154, 8, NULL, 'Group 8, email 10', 1, '1', '2018-08-09 10:49:15'),
	(155, 8, NULL, 'Group 8, email 11', 2, '1', '2018-08-09 10:17:33'),
	(156, 8, NULL, 'Group 8, email 12', 2, '1', '2018-08-09 10:17:32'),
	(157, 8, NULL, 'Group 8, email 13', 4, '1', '2018-08-09 10:17:31'),
	(158, 8, NULL, 'Group 8, email 14', 2, '1', '2018-08-09 10:17:29'),
	(159, 8, NULL, 'Group 8, email 15', 1, '1', '2018-08-09 10:17:28'),
	(160, 8, NULL, 'Group 8, email 16', 4, '1', '2018-08-09 10:21:10'),
	(161, 8, NULL, 'Group 8, email 17', 4, '1', '2018-08-09 10:17:21'),
	(162, 8, NULL, 'Group 8, email 18', 2, '2', '2018-08-09 13:54:08'),
	(163, 8, NULL, 'Group 8, email 19', 1, '1', '2018-08-10 17:19:17'),
	(164, 8, NULL, 'Group 8, email 20', 1, '1', '2018-08-10 17:16:50');
/*!40000 ALTER TABLE `email` ENABLE KEYS */;

-- Dumping structure for table spam_email.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table spam_email.migrations: ~0 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Dumping structure for table spam_email.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID tự tăng',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tên',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Địa chỉ email',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Password',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Remember đăng nhập',
  `created_at` timestamp NULL DEFAULT NULL COMMENT 'Thời điểm tạo',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'Thời điểm cập nhật',
  `is_admin` tinyint(4) DEFAULT NULL COMMENT '1 - là admin, NULL - user thường',
  `fullname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Tên đầy đủ',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Số điện thoại',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table spam_email.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`, `is_admin`, `fullname`, `phone`) VALUES
	(2, 'lockex1987', 'lockex1987@gmail.com', '$2y$10$djdBMD.474kiMJSoNX3bfu4MElwUiG9VFj.wPckXUeZN9SocuHig.', 'hHzKjmBwnuitbPua7gXdemOmJZu9tsItO1RqLb2zwpLiXSgdOI1RBnXmx6sE', '2018-08-07 01:38:44', '2018-08-11 08:04:03', 1, 'Locke Laton', '9999');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
