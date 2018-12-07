-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.34-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table verification.calendar
CREATE TABLE IF NOT EXISTS `calendar` (
  `date` date NOT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- Dumping data for table verification.calendar: ~366 rows (approximately)
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` (`date`) VALUES
	('2018-01-01'),
	('2018-01-02'),
	('2018-01-03'),
	('2018-01-04'),
	('2018-01-05'),
	('2018-01-06'),
	('2018-01-07'),
	('2018-01-08'),
	('2018-01-09'),
	('2018-01-10'),
	('2018-01-11'),
	('2018-01-12'),
	('2018-01-13'),
	('2018-01-14'),
	('2018-01-15'),
	('2018-01-16'),
	('2018-01-17'),
	('2018-01-18'),
	('2018-01-19'),
	('2018-01-20'),
	('2018-01-21'),
	('2018-01-22'),
	('2018-01-23'),
	('2018-01-24'),
	('2018-01-25'),
	('2018-01-26'),
	('2018-01-27'),
	('2018-01-28'),
	('2018-01-29'),
	('2018-01-30'),
	('2018-01-31'),
	('2018-02-01'),
	('2018-02-02'),
	('2018-02-03'),
	('2018-02-04'),
	('2018-02-05'),
	('2018-02-06'),
	('2018-02-07'),
	('2018-02-08'),
	('2018-02-09'),
	('2018-02-10'),
	('2018-02-11'),
	('2018-02-12'),
	('2018-02-13'),
	('2018-02-14'),
	('2018-02-15'),
	('2018-02-16'),
	('2018-02-17'),
	('2018-02-18'),
	('2018-02-19'),
	('2018-02-20'),
	('2018-02-21'),
	('2018-02-22'),
	('2018-02-23'),
	('2018-02-24'),
	('2018-02-25'),
	('2018-02-26'),
	('2018-02-27'),
	('2018-02-28'),
	('2018-03-01'),
	('2018-03-02'),
	('2018-03-03'),
	('2018-03-04'),
	('2018-03-05'),
	('2018-03-06'),
	('2018-03-07'),
	('2018-03-08'),
	('2018-03-09'),
	('2018-03-10'),
	('2018-03-11'),
	('2018-03-12'),
	('2018-03-13'),
	('2018-03-14'),
	('2018-03-15'),
	('2018-03-16'),
	('2018-03-17'),
	('2018-03-18'),
	('2018-03-19'),
	('2018-03-20'),
	('2018-03-21'),
	('2018-03-22'),
	('2018-03-23'),
	('2018-03-24'),
	('2018-03-25'),
	('2018-03-26'),
	('2018-03-27'),
	('2018-03-28'),
	('2018-03-29'),
	('2018-03-30'),
	('2018-03-31'),
	('2018-04-01'),
	('2018-04-02'),
	('2018-04-03'),
	('2018-04-04'),
	('2018-04-05'),
	('2018-04-06'),
	('2018-04-07'),
	('2018-04-08'),
	('2018-04-09'),
	('2018-04-10'),
	('2018-04-11'),
	('2018-04-12'),
	('2018-04-13'),
	('2018-04-14'),
	('2018-04-15'),
	('2018-04-16'),
	('2018-04-17'),
	('2018-04-18'),
	('2018-04-19'),
	('2018-04-20'),
	('2018-04-21'),
	('2018-04-22'),
	('2018-04-23'),
	('2018-04-24'),
	('2018-04-25'),
	('2018-04-26'),
	('2018-04-27'),
	('2018-04-28'),
	('2018-04-29'),
	('2018-04-30'),
	('2018-05-01'),
	('2018-05-02'),
	('2018-05-03'),
	('2018-05-04'),
	('2018-05-05'),
	('2018-05-06'),
	('2018-05-07'),
	('2018-05-08'),
	('2018-05-09'),
	('2018-05-10'),
	('2018-05-11'),
	('2018-05-12'),
	('2018-05-13'),
	('2018-05-14'),
	('2018-05-15'),
	('2018-05-16'),
	('2018-05-17'),
	('2018-05-18'),
	('2018-05-19'),
	('2018-05-20'),
	('2018-05-21'),
	('2018-05-22'),
	('2018-05-23'),
	('2018-05-24'),
	('2018-05-25'),
	('2018-05-26'),
	('2018-05-27'),
	('2018-05-28'),
	('2018-05-29'),
	('2018-05-30'),
	('2018-05-31'),
	('2018-06-01'),
	('2018-06-02'),
	('2018-06-03'),
	('2018-06-04'),
	('2018-06-05'),
	('2018-06-06'),
	('2018-06-07'),
	('2018-06-08'),
	('2018-06-09'),
	('2018-06-10'),
	('2018-06-11'),
	('2018-06-12'),
	('2018-06-13'),
	('2018-06-14'),
	('2018-06-15'),
	('2018-06-16'),
	('2018-06-17'),
	('2018-06-18'),
	('2018-06-19'),
	('2018-06-20'),
	('2018-06-21'),
	('2018-06-22'),
	('2018-06-23'),
	('2018-06-24'),
	('2018-06-25'),
	('2018-06-26'),
	('2018-06-27'),
	('2018-06-28'),
	('2018-06-29'),
	('2018-06-30'),
	('2018-07-01'),
	('2018-07-02'),
	('2018-07-03'),
	('2018-07-04'),
	('2018-07-05'),
	('2018-07-06'),
	('2018-07-07'),
	('2018-07-08'),
	('2018-07-09'),
	('2018-07-10'),
	('2018-07-11'),
	('2018-07-12'),
	('2018-07-13'),
	('2018-07-14'),
	('2018-07-15'),
	('2018-07-16'),
	('2018-07-17'),
	('2018-07-18'),
	('2018-07-19'),
	('2018-07-20'),
	('2018-07-21'),
	('2018-07-22'),
	('2018-07-23'),
	('2018-07-24'),
	('2018-07-25'),
	('2018-07-26'),
	('2018-07-27'),
	('2018-07-28'),
	('2018-07-29'),
	('2018-07-30'),
	('2018-07-31'),
	('2018-08-01'),
	('2018-08-02'),
	('2018-08-03'),
	('2018-08-04'),
	('2018-08-05'),
	('2018-08-06'),
	('2018-08-07'),
	('2018-08-08'),
	('2018-08-09'),
	('2018-08-10'),
	('2018-08-11'),
	('2018-08-12'),
	('2018-08-13'),
	('2018-08-14'),
	('2018-08-15'),
	('2018-08-16'),
	('2018-08-17'),
	('2018-08-18'),
	('2018-08-19'),
	('2018-08-20'),
	('2018-08-21'),
	('2018-08-22'),
	('2018-08-23'),
	('2018-08-24'),
	('2018-08-25'),
	('2018-08-26'),
	('2018-08-27'),
	('2018-08-28'),
	('2018-08-29'),
	('2018-08-30'),
	('2018-08-31'),
	('2018-09-01'),
	('2018-09-02'),
	('2018-09-03'),
	('2018-09-04'),
	('2018-09-05'),
	('2018-09-06'),
	('2018-09-07'),
	('2018-09-08'),
	('2018-09-09'),
	('2018-09-10'),
	('2018-09-11'),
	('2018-09-12'),
	('2018-09-13'),
	('2018-09-14'),
	('2018-09-15'),
	('2018-09-16'),
	('2018-09-17'),
	('2018-09-18'),
	('2018-09-19'),
	('2018-09-20'),
	('2018-09-21'),
	('2018-09-22'),
	('2018-09-23'),
	('2018-09-24'),
	('2018-09-25'),
	('2018-09-26'),
	('2018-09-27'),
	('2018-09-28'),
	('2018-09-29'),
	('2018-09-30'),
	('2018-10-01'),
	('2018-10-02'),
	('2018-10-03'),
	('2018-10-04'),
	('2018-10-05'),
	('2018-10-06'),
	('2018-10-07'),
	('2018-10-08'),
	('2018-10-09'),
	('2018-10-10'),
	('2018-10-11'),
	('2018-10-12'),
	('2018-10-13'),
	('2018-10-14'),
	('2018-10-15'),
	('2018-10-16'),
	('2018-10-17'),
	('2018-10-18'),
	('2018-10-19'),
	('2018-10-20'),
	('2018-10-21'),
	('2018-10-22'),
	('2018-10-23'),
	('2018-10-24'),
	('2018-10-25'),
	('2018-10-26'),
	('2018-10-27'),
	('2018-10-28'),
	('2018-10-29'),
	('2018-10-30'),
	('2018-10-31'),
	('2018-11-01'),
	('2018-11-02'),
	('2018-11-03'),
	('2018-11-04'),
	('2018-11-05'),
	('2018-11-06'),
	('2018-11-07'),
	('2018-11-08'),
	('2018-11-09'),
	('2018-11-10'),
	('2018-11-11'),
	('2018-11-12'),
	('2018-11-13'),
	('2018-11-14'),
	('2018-11-15'),
	('2018-11-16'),
	('2018-11-17'),
	('2018-11-18'),
	('2018-11-19'),
	('2018-11-20'),
	('2018-11-21'),
	('2018-11-22'),
	('2018-11-23'),
	('2018-11-24'),
	('2018-11-25'),
	('2018-11-26'),
	('2018-11-27'),
	('2018-11-28'),
	('2018-11-29'),
	('2018-11-30'),
	('2018-12-01'),
	('2018-12-02'),
	('2018-12-03'),
	('2018-12-04'),
	('2018-12-05'),
	('2018-12-06'),
	('2018-12-07'),
	('2018-12-08'),
	('2018-12-09'),
	('2018-12-10'),
	('2018-12-11'),
	('2018-12-12'),
	('2018-12-13'),
	('2018-12-14'),
	('2018-12-15'),
	('2018-12-16'),
	('2018-12-17'),
	('2018-12-18'),
	('2018-12-19'),
	('2018-12-20'),
	('2018-12-21'),
	('2018-12-22'),
	('2018-12-23'),
	('2018-12-24'),
	('2018-12-25'),
	('2018-12-26'),
	('2018-12-27'),
	('2018-12-28'),
	('2018-12-29'),
	('2018-12-30'),
	('2018-12-31');
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;

-- Dumping structure for table verification.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1257 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table verification.orders: ~741 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `user_id`, `date`, `number`) VALUES
	(340, 6, '2018-12-03', 1),
	(341, 6, '2018-12-04', 1),
	(342, 6, '2018-12-05', 1),
	(343, 6, '2018-12-06', 1),
	(344, 6, '2018-12-07', 1),
	(345, 6, '2018-12-08', 1),
	(346, 6, '2018-12-10', 1),
	(347, 6, '2018-12-11', 1),
	(348, 6, '2018-12-12', 1),
	(349, 6, '2018-12-13', 1),
	(350, 6, '2018-12-14', 1),
	(351, 6, '2018-12-15', 1),
	(352, 6, '2018-12-17', 1),
	(353, 6, '2018-12-18', 1),
	(354, 6, '2018-12-19', 1),
	(355, 6, '2018-12-20', 1),
	(356, 6, '2018-12-21', 1),
	(357, 6, '2018-12-22', 1),
	(358, 6, '2018-12-24', 1),
	(359, 6, '2018-12-25', 1),
	(360, 6, '2018-12-26', 1),
	(361, 6, '2018-12-27', 1),
	(362, 6, '2018-12-28', 1),
	(363, 6, '2018-12-29', 1),
	(364, 6, '2018-12-31', 1),
	(365, 22, '2018-12-03', 1),
	(366, 22, '2018-12-04', 1),
	(367, 22, '2018-12-05', 1),
	(368, 24, '2018-12-03', 1),
	(369, 24, '2018-12-04', 1),
	(370, 24, '2018-12-05', 1),
	(371, 24, '2018-12-06', 1),
	(372, 24, '2018-12-07', 1),
	(374, 24, '2018-12-10', 1),
	(375, 24, '2018-12-11', 1),
	(376, 24, '2018-12-12', 1),
	(377, 24, '2018-12-13', 1),
	(378, 24, '2018-12-14', 1),
	(379, 24, '2018-12-15', 1),
	(380, 24, '2018-12-17', 1),
	(381, 24, '2018-12-18', 1),
	(382, 24, '2018-12-19', 1),
	(383, 24, '2018-12-20', 1),
	(384, 24, '2018-12-21', 1),
	(386, 24, '2018-12-24', 1),
	(387, 24, '2018-12-25', 1),
	(388, 24, '2018-12-26', 1),
	(389, 24, '2018-12-27', 1),
	(390, 24, '2018-12-28', 1),
	(391, 24, '2018-12-29', 1),
	(392, 25, '2018-12-03', 1),
	(393, 25, '2018-12-04', 1),
	(394, 25, '2018-12-05', 1),
	(395, 25, '2018-12-06', 1),
	(396, 25, '2018-12-07', 1),
	(397, 25, '2018-12-08', 1),
	(398, 25, '2018-12-10', 1),
	(399, 25, '2018-12-11', 1),
	(400, 25, '2018-12-12', 1),
	(401, 25, '2018-12-13', 1),
	(402, 25, '2018-12-14', 1),
	(403, 25, '2018-12-15', 1),
	(404, 25, '2018-12-17', 1),
	(405, 25, '2018-12-18', 1),
	(406, 25, '2018-12-19', 1),
	(407, 25, '2018-12-20', 1),
	(408, 25, '2018-12-21', 1),
	(409, 25, '2018-12-22', 1),
	(410, 25, '2018-12-24', 1),
	(411, 25, '2018-12-25', 1),
	(412, 25, '2018-12-26', 1),
	(413, 25, '2018-12-27', 1),
	(414, 25, '2018-12-28', 1),
	(415, 25, '2018-12-29', 1),
	(442, 28, '2018-12-03', 1),
	(443, 28, '2018-12-04', 1),
	(444, 28, '2018-12-05', 1),
	(445, 28, '2018-12-06', 1),
	(446, 28, '2018-12-07', 1),
	(448, 28, '2018-12-10', 1),
	(450, 28, '2018-12-12', 1),
	(451, 28, '2018-12-13', 1),
	(453, 28, '2018-12-15', 1),
	(454, 28, '2018-12-17', 1),
	(456, 28, '2018-12-19', 1),
	(457, 28, '2018-12-20', 1),
	(460, 28, '2018-12-24', 1),
	(462, 28, '2018-12-26', 1),
	(463, 28, '2018-12-27', 1),
	(465, 28, '2018-12-29', 1),
	(466, 29, '2018-12-03', 1),
	(467, 29, '2018-12-04', 1),
	(468, 29, '2018-12-05', 1),
	(469, 29, '2018-12-06', 1),
	(470, 29, '2018-12-07', 1),
	(472, 29, '2018-12-10', 1),
	(473, 29, '2018-12-11', 1),
	(474, 29, '2018-12-12', 1),
	(475, 29, '2018-12-13', 1),
	(476, 29, '2018-12-14', 1),
	(478, 29, '2018-12-17', 1),
	(479, 29, '2018-12-18', 1),
	(480, 29, '2018-12-19', 1),
	(481, 29, '2018-12-20', 1),
	(482, 29, '2018-12-21', 1),
	(484, 29, '2018-12-24', 1),
	(485, 29, '2018-12-25', 1),
	(486, 29, '2018-12-26', 1),
	(487, 29, '2018-12-27', 1),
	(488, 29, '2018-12-28', 1),
	(490, 32, '2018-12-03', 1),
	(491, 32, '2018-12-04', 1),
	(496, 32, '2018-12-10', 1),
	(497, 32, '2018-12-11', 1),
	(498, 32, '2018-12-12', 1),
	(499, 32, '2018-12-13', 1),
	(500, 32, '2018-12-14', 1),
	(501, 32, '2018-12-15', 1),
	(502, 32, '2018-12-17', 1),
	(503, 32, '2018-12-18', 1),
	(504, 32, '2018-12-19', 1),
	(505, 32, '2018-12-20', 1),
	(506, 32, '2018-12-21', 1),
	(508, 32, '2018-12-24', 1),
	(509, 32, '2018-12-25', 1),
	(510, 32, '2018-12-26', 1),
	(511, 32, '2018-12-27', 1),
	(512, 32, '2018-12-28', 1),
	(513, 32, '2018-12-29', 1),
	(514, 32, '2018-12-31', 1),
	(515, 34, '2018-12-03', 1),
	(516, 34, '2018-12-04', 1),
	(517, 34, '2018-12-05', 1),
	(518, 34, '2018-12-06', 1),
	(519, 34, '2018-12-07', 1),
	(521, 34, '2018-12-10', 1),
	(522, 34, '2018-12-11', 1),
	(523, 34, '2018-12-12', 1),
	(524, 34, '2018-12-13', 1),
	(525, 34, '2018-12-14', 1),
	(526, 34, '2018-12-15', 1),
	(527, 34, '2018-12-17', 1),
	(528, 34, '2018-12-18', 1),
	(529, 34, '2018-12-19', 1),
	(530, 34, '2018-12-20', 1),
	(531, 34, '2018-12-21', 1),
	(533, 34, '2018-12-24', 1),
	(534, 34, '2018-12-25', 1),
	(535, 34, '2018-12-26', 1),
	(536, 34, '2018-12-27', 1),
	(537, 34, '2018-12-28', 1),
	(538, 34, '2018-12-29', 1),
	(540, 12, '2018-12-03', 1),
	(541, 12, '2018-12-04', 1),
	(542, 12, '2018-12-05', 1),
	(543, 12, '2018-12-06', 1),
	(548, 9, '2018-12-03', 1),
	(549, 9, '2018-12-04', 1),
	(550, 9, '2018-12-05', 1),
	(551, 9, '2018-12-06', 1),
	(552, 9, '2018-12-07', 1),
	(554, 9, '2018-12-10', 1),
	(555, 9, '2018-12-11', 1),
	(556, 9, '2018-12-12', 1),
	(557, 9, '2018-12-13', 1),
	(558, 9, '2018-12-14', 1),
	(560, 9, '2018-12-17', 1),
	(561, 9, '2018-12-18', 1),
	(562, 9, '2018-12-19', 1),
	(563, 9, '2018-12-20', 1),
	(564, 9, '2018-12-21', 1),
	(566, 9, '2018-12-24', 1),
	(567, 9, '2018-12-25', 1),
	(568, 9, '2018-12-26', 1),
	(569, 9, '2018-12-27', 1),
	(570, 9, '2018-12-28', 1),
	(572, 19, '2018-12-03', 1),
	(573, 16, '2018-12-04', 1),
	(574, 16, '2018-12-05', 1),
	(575, 16, '2018-12-06', 1),
	(576, 16, '2018-12-07', 1),
	(577, 16, '2018-12-10', 1),
	(578, 16, '2018-12-11', 1),
	(579, 16, '2018-12-12', 1),
	(580, 16, '2018-12-13', 1),
	(581, 16, '2018-12-14', 1),
	(582, 16, '2018-12-15', 1),
	(583, 16, '2018-12-17', 1),
	(584, 16, '2018-12-18', 1),
	(585, 16, '2018-12-19', 1),
	(586, 16, '2018-12-20', 1),
	(587, 16, '2018-12-21', 1),
	(588, 16, '2018-12-24', 1),
	(589, 16, '2018-12-25', 1),
	(590, 16, '2018-12-26', 1),
	(591, 16, '2018-12-27', 1),
	(592, 16, '2018-12-28', 1),
	(593, 16, '2018-12-29', 1),
	(596, 36, '2018-12-04', 1),
	(597, 37, '2018-12-04', 1),
	(598, 37, '2018-12-05', 1),
	(599, 37, '2018-12-06', 1),
	(600, 37, '2018-12-07', 1),
	(601, 37, '2018-12-08', 1),
	(602, 37, '2018-12-10', 1),
	(603, 37, '2018-12-11', 1),
	(604, 37, '2018-12-12', 1),
	(605, 37, '2018-12-13', 1),
	(606, 37, '2018-12-14', 1),
	(607, 37, '2018-12-15', 1),
	(608, 37, '2018-12-17', 1),
	(609, 37, '2018-12-18', 1),
	(610, 37, '2018-12-19', 1),
	(611, 37, '2018-12-20', 1),
	(612, 37, '2018-12-21', 1),
	(613, 37, '2018-12-22', 1),
	(614, 37, '2018-12-24', 1),
	(615, 37, '2018-12-25', 1),
	(616, 37, '2018-12-26', 1),
	(617, 37, '2018-12-27', 1),
	(618, 37, '2018-12-28', 1),
	(619, 37, '2018-12-29', 1),
	(644, 39, '2018-12-03', 1),
	(645, 40, '2018-12-04', 1),
	(646, 40, '2018-12-05', 1),
	(647, 40, '2018-12-06', 1),
	(650, 40, '2018-12-10', 1),
	(651, 40, '2018-12-11', 1),
	(652, 40, '2018-12-12', 1),
	(653, 40, '2018-12-13', 1),
	(656, 40, '2018-12-17', 1),
	(657, 40, '2018-12-18', 1),
	(658, 40, '2018-12-19', 1),
	(659, 40, '2018-12-20', 1),
	(662, 40, '2018-12-24', 1),
	(663, 40, '2018-12-25', 1),
	(664, 40, '2018-12-26', 1),
	(665, 40, '2018-12-27', 1),
	(668, 41, '2018-12-04', 1),
	(669, 41, '2018-12-05', 1),
	(670, 41, '2018-12-06', 1),
	(671, 41, '2018-12-07', 1),
	(673, 41, '2018-12-10', 1),
	(674, 41, '2018-12-11', 1),
	(675, 41, '2018-12-12', 1),
	(676, 41, '2018-12-13', 1),
	(677, 41, '2018-12-14', 1),
	(678, 41, '2018-12-15', 1),
	(679, 41, '2018-12-17', 1),
	(680, 41, '2018-12-18', 1),
	(681, 41, '2018-12-19', 1),
	(682, 41, '2018-12-20', 1),
	(683, 41, '2018-12-21', 1),
	(685, 41, '2018-12-24', 1),
	(686, 41, '2018-12-25', 1),
	(687, 41, '2018-12-26', 1),
	(688, 41, '2018-12-27', 1),
	(689, 41, '2018-12-28', 1),
	(690, 41, '2018-12-29', 1),
	(691, 42, '2018-12-04', 1),
	(692, 42, '2018-12-05', 1),
	(696, 42, '2018-12-10', 1),
	(697, 42, '2018-12-11', 1),
	(698, 42, '2018-12-12', 1),
	(699, 42, '2018-12-13', 1),
	(700, 42, '2018-12-14', 1),
	(701, 42, '2018-12-15', 1),
	(702, 42, '2018-12-17', 1),
	(703, 42, '2018-12-18', 1),
	(704, 42, '2018-12-19', 1),
	(705, 42, '2018-12-20', 1),
	(706, 42, '2018-12-21', 1),
	(708, 42, '2018-12-24', 1),
	(709, 42, '2018-12-25', 1),
	(710, 42, '2018-12-26', 1),
	(711, 42, '2018-12-27', 1),
	(712, 42, '2018-12-28', 1),
	(713, 42, '2018-12-29', 1),
	(714, 43, '2018-12-04', 1),
	(715, 43, '2018-12-05', 1),
	(716, 43, '2018-12-06', 1),
	(717, 43, '2018-12-07', 1),
	(719, 43, '2018-12-10', 1),
	(720, 43, '2018-12-11', 1),
	(721, 43, '2018-12-12', 1),
	(722, 43, '2018-12-13', 1),
	(723, 43, '2018-12-14', 1),
	(724, 43, '2018-12-15', 1),
	(725, 43, '2018-12-17', 1),
	(726, 43, '2018-12-18', 1),
	(727, 43, '2018-12-19', 1),
	(728, 43, '2018-12-20', 1),
	(729, 43, '2018-12-21', 1),
	(731, 43, '2018-12-24', 1),
	(732, 43, '2018-12-25', 1),
	(733, 43, '2018-12-26', 1),
	(734, 43, '2018-12-27', 1),
	(735, 43, '2018-12-28', 1),
	(736, 43, '2018-12-29', 1),
	(737, 33, '2018-12-04', 1),
	(738, 39, '2018-12-04', 1),
	(739, 39, '2018-12-05', 1),
	(740, 39, '2018-12-06', 1),
	(741, 46, '2018-12-04', 1),
	(743, 8, '2018-12-04', 1),
	(744, 8, '2018-12-05', 1),
	(745, 8, '2018-12-06', 1),
	(746, 8, '2018-12-07', 1),
	(748, 8, '2018-12-10', 1),
	(749, 8, '2018-12-11', 1),
	(750, 8, '2018-12-12', 1),
	(751, 8, '2018-12-13', 1),
	(752, 8, '2018-12-14', 1),
	(753, 8, '2018-12-15', 1),
	(754, 8, '2018-12-17', 1),
	(755, 8, '2018-12-18', 1),
	(756, 8, '2018-12-19', 1),
	(757, 8, '2018-12-20', 1),
	(758, 8, '2018-12-21', 1),
	(760, 8, '2018-12-24', 1),
	(761, 8, '2018-12-25', 1),
	(762, 8, '2018-12-26', 1),
	(763, 8, '2018-12-27', 1),
	(764, 8, '2018-12-28', 1),
	(765, 8, '2018-12-29', 1),
	(768, 50, '2018-12-05', 1),
	(769, 50, '2018-12-06', 1),
	(770, 50, '2018-12-07', 1),
	(771, 50, '2018-12-08', 1),
	(772, 50, '2018-12-10', 1),
	(773, 50, '2018-12-11', 1),
	(774, 50, '2018-12-12', 1),
	(775, 50, '2018-12-13', 1),
	(776, 50, '2018-12-14', 1),
	(777, 50, '2018-12-15', 1),
	(778, 50, '2018-12-17', 1),
	(779, 50, '2018-12-18', 1),
	(780, 50, '2018-12-19', 1),
	(781, 50, '2018-12-20', 1),
	(782, 50, '2018-12-21', 1),
	(783, 50, '2018-12-22', 1),
	(784, 50, '2018-12-24', 1),
	(785, 50, '2018-12-25', 1),
	(786, 50, '2018-12-26', 1),
	(787, 50, '2018-12-27', 1),
	(788, 50, '2018-12-28', 1),
	(789, 50, '2018-12-29', 1),
	(790, 50, '2018-12-04', 1),
	(791, 49, '2018-12-04', 1),
	(792, 20, '2018-12-04', 1),
	(793, 20, '2018-12-05', 1),
	(794, 20, '2018-12-06', 1),
	(795, 20, '2018-12-07', 1),
	(796, 20, '2018-12-08', 1),
	(797, 20, '2018-12-10', 1),
	(798, 20, '2018-12-11', 1),
	(799, 20, '2018-12-12', 1),
	(800, 20, '2018-12-13', 1),
	(801, 20, '2018-12-14', 1),
	(802, 20, '2018-12-15', 1),
	(803, 20, '2018-12-17', 1),
	(804, 20, '2018-12-18', 1),
	(805, 20, '2018-12-19', 1),
	(806, 20, '2018-12-20', 1),
	(807, 20, '2018-12-21', 1),
	(808, 20, '2018-12-22', 1),
	(809, 20, '2018-12-24', 1),
	(810, 20, '2018-12-25', 1),
	(811, 20, '2018-12-26', 1),
	(812, 20, '2018-12-27', 1),
	(813, 20, '2018-12-28', 1),
	(814, 20, '2018-12-29', 1),
	(816, 49, '2018-12-06', 1),
	(817, 49, '2018-12-05', 1),
	(818, 49, '2018-12-07', 1),
	(820, 51, '2018-12-04', 1),
	(821, 51, '2018-12-05', 1),
	(822, 51, '2018-12-06', 1),
	(823, 51, '2018-12-07', 1),
	(824, 52, '2018-12-04', 1),
	(825, 52, '2018-12-05', 1),
	(826, 52, '2018-12-06', 1),
	(827, 52, '2018-12-07', 1),
	(829, 52, '2018-12-10', 1),
	(830, 52, '2018-12-11', 1),
	(831, 52, '2018-12-12', 1),
	(832, 52, '2018-12-13', 1),
	(833, 52, '2018-12-14', 1),
	(834, 52, '2018-12-15', 1),
	(835, 52, '2018-12-17', 1),
	(836, 52, '2018-12-18', 1),
	(837, 52, '2018-12-19', 1),
	(838, 52, '2018-12-20', 1),
	(839, 52, '2018-12-21', 1),
	(841, 52, '2018-12-24', 1),
	(842, 52, '2018-12-25', 1),
	(843, 52, '2018-12-26', 1),
	(844, 52, '2018-12-27', 1),
	(845, 52, '2018-12-28', 1),
	(848, 51, '2018-12-10', 1),
	(849, 51, '2018-12-11', 1),
	(850, 51, '2018-12-12', 1),
	(851, 51, '2018-12-13', 1),
	(852, 51, '2018-12-14', 1),
	(853, 51, '2018-12-15', 1),
	(854, 51, '2018-12-17', 1),
	(855, 51, '2018-12-18', 1),
	(856, 51, '2018-12-19', 1),
	(857, 51, '2018-12-20', 1),
	(858, 51, '2018-12-21', 1),
	(860, 51, '2018-12-24', 1),
	(861, 51, '2018-12-25', 1),
	(862, 51, '2018-12-26', 1),
	(863, 51, '2018-12-27', 1),
	(864, 51, '2018-12-28', 1),
	(865, 51, '2018-12-29', 1),
	(866, 54, '2018-12-04', 1),
	(867, 54, '2018-12-05', 1),
	(868, 54, '2018-12-06', 1),
	(869, 54, '2018-12-07', 1),
	(871, 54, '2018-12-10', 1),
	(872, 54, '2018-12-11', 1),
	(873, 54, '2018-12-12', 1),
	(874, 54, '2018-12-13', 1),
	(875, 54, '2018-12-14', 1),
	(876, 54, '2018-12-15', 1),
	(877, 54, '2018-12-17', 1),
	(878, 54, '2018-12-18', 1),
	(879, 54, '2018-12-19', 1),
	(880, 54, '2018-12-20', 1),
	(881, 54, '2018-12-21', 1),
	(883, 54, '2018-12-24', 1),
	(884, 54, '2018-12-25', 1),
	(885, 54, '2018-12-26', 1),
	(886, 54, '2018-12-27', 1),
	(887, 54, '2018-12-28', 1),
	(888, 54, '2018-12-29', 1),
	(889, 56, '2018-12-04', 1),
	(890, 56, '2018-12-05', 1),
	(891, 56, '2018-12-06', 1),
	(892, 56, '2018-12-07', 1),
	(894, 56, '2018-12-10', 1),
	(895, 56, '2018-12-11', 1),
	(896, 56, '2018-12-12', 1),
	(897, 56, '2018-12-13', 1),
	(898, 56, '2018-12-14', 1),
	(899, 56, '2018-12-15', 1),
	(900, 56, '2018-12-17', 1),
	(901, 56, '2018-12-18', 1),
	(902, 56, '2018-12-19', 1),
	(903, 56, '2018-12-20', 1),
	(904, 56, '2018-12-21', 1),
	(906, 56, '2018-12-24', 1),
	(907, 56, '2018-12-25', 1),
	(908, 56, '2018-12-26', 1),
	(909, 56, '2018-12-27', 1),
	(910, 56, '2018-12-28', 1),
	(911, 56, '2018-12-29', 1),
	(912, 57, '2018-12-04', 1),
	(913, 55, '2018-12-04', 1),
	(914, 55, '2018-12-05', 1),
	(915, 55, '2018-12-06', 1),
	(916, 55, '2018-12-07', 1),
	(918, 55, '2018-12-10', 1),
	(919, 55, '2018-12-11', 1),
	(920, 55, '2018-12-12', 1),
	(921, 55, '2018-12-13', 1),
	(922, 55, '2018-12-14', 1),
	(923, 55, '2018-12-15', 1),
	(924, 55, '2018-12-17', 1),
	(925, 55, '2018-12-18', 1),
	(926, 55, '2018-12-19', 1),
	(927, 55, '2018-12-20', 1),
	(928, 55, '2018-12-21', 1),
	(930, 55, '2018-12-24', 1),
	(931, 55, '2018-12-25', 1),
	(932, 55, '2018-12-26', 1),
	(933, 55, '2018-12-27', 1),
	(934, 55, '2018-12-28', 1),
	(935, 55, '2018-12-29', 1),
	(936, 15, '2018-12-04', 1),
	(937, 15, '2018-12-05', 1),
	(938, 15, '2018-12-06', 1),
	(939, 15, '2018-12-07', 1),
	(941, 15, '2018-12-10', 1),
	(942, 15, '2018-12-11', 1),
	(943, 15, '2018-12-12', 1),
	(944, 15, '2018-12-13', 1),
	(945, 15, '2018-12-14', 1),
	(946, 15, '2018-12-15', 1),
	(947, 15, '2018-12-17', 1),
	(948, 15, '2018-12-18', 1),
	(949, 15, '2018-12-19', 1),
	(950, 15, '2018-12-20', 1),
	(951, 15, '2018-12-21', 1),
	(953, 15, '2018-12-24', 1),
	(954, 15, '2018-12-25', 1),
	(955, 15, '2018-12-26', 1),
	(956, 15, '2018-12-27', 1),
	(957, 15, '2018-12-28', 1),
	(958, 15, '2018-12-29', 1),
	(959, 49, '2018-12-10', 1),
	(960, 38, '2018-12-04', 1),
	(961, 38, '2018-12-05', 1),
	(962, 38, '2018-12-06', 1),
	(963, 38, '2018-12-07', 1),
	(965, 38, '2018-12-10', 1),
	(966, 38, '2018-12-11', 1),
	(967, 38, '2018-12-12', 1),
	(968, 38, '2018-12-13', 1),
	(969, 38, '2018-12-14', 1),
	(970, 38, '2018-12-15', 1),
	(971, 38, '2018-12-17', 1),
	(972, 38, '2018-12-18', 1),
	(973, 38, '2018-12-19', 1),
	(974, 38, '2018-12-20', 1),
	(975, 38, '2018-12-21', 1),
	(977, 38, '2018-12-24', 1),
	(978, 38, '2018-12-25', 1),
	(979, 38, '2018-12-26', 1),
	(980, 38, '2018-12-27', 1),
	(981, 38, '2018-12-28', 1),
	(982, 38, '2018-12-29', 1),
	(983, 38, '2018-12-31', 1),
	(984, 17, '2018-12-04', 1),
	(985, 17, '2018-12-05', 1),
	(986, 17, '2018-12-06', 1),
	(987, 17, '2018-12-07', 1),
	(989, 17, '2018-12-10', 1),
	(990, 17, '2018-12-11', 1),
	(991, 17, '2018-12-12', 1),
	(992, 17, '2018-12-13', 1),
	(993, 17, '2018-12-14', 1),
	(994, 17, '2018-12-15', 1),
	(995, 17, '2018-12-17', 1),
	(996, 17, '2018-12-18', 1),
	(997, 17, '2018-12-19', 1),
	(998, 17, '2018-12-20', 1),
	(999, 17, '2018-12-21', 1),
	(1001, 17, '2018-12-24', 1),
	(1002, 17, '2018-12-25', 1),
	(1003, 17, '2018-12-26', 1),
	(1004, 17, '2018-12-27', 1),
	(1005, 17, '2018-12-28', 1),
	(1006, 17, '2018-12-29', 1),
	(1008, 17, '2018-12-31', 1),
	(1025, 49, '2018-12-11', 1),
	(1034, 59, '2018-12-04', 1),
	(1035, 59, '2018-12-05', 1),
	(1036, 59, '2018-12-06', 1),
	(1037, 59, '2018-12-07', 1),
	(1039, 59, '2018-12-10', 1),
	(1040, 59, '2018-12-11', 1),
	(1041, 59, '2018-12-12', 1),
	(1042, 59, '2018-12-13', 1),
	(1043, 59, '2018-12-14', 1),
	(1044, 59, '2018-12-15', 1),
	(1045, 59, '2018-12-17', 1),
	(1046, 59, '2018-12-18', 1),
	(1047, 59, '2018-12-19', 1),
	(1048, 59, '2018-12-20', 1),
	(1049, 59, '2018-12-21', 1),
	(1051, 59, '2018-12-24', 1),
	(1052, 59, '2018-12-25', 1),
	(1053, 59, '2018-12-26', 1),
	(1054, 59, '2018-12-27', 1),
	(1055, 59, '2018-12-28', 1),
	(1056, 59, '2018-12-29', 1),
	(1057, 49, '2018-12-12', 1),
	(1058, 49, '2018-12-13', 1),
	(1059, 49, '2018-12-14', 1),
	(1060, 49, '2018-12-15', 1),
	(1061, 49, '2018-12-29', 1),
	(1062, 49, '2018-12-21', 1),
	(1063, 49, '2018-12-17', 1),
	(1064, 49, '2018-12-18', 1),
	(1065, 51, '2018-12-31', 1),
	(1066, 46, '2018-12-05', 1),
	(1067, 46, '2018-12-06', 1),
	(1068, 46, '2018-12-07', 1),
	(1070, 46, '2018-12-10', 1),
	(1071, 46, '2018-12-11', 1),
	(1072, 46, '2018-12-12', 1),
	(1073, 46, '2018-12-13', 1),
	(1075, 46, '2018-12-17', 1),
	(1076, 46, '2018-12-18', 1),
	(1077, 46, '2018-12-19', 1),
	(1078, 46, '2018-12-20', 1),
	(1079, 46, '2018-12-21', 1),
	(1080, 46, '2018-12-24', 1),
	(1081, 46, '2018-12-25', 1),
	(1082, 46, '2018-12-26', 1),
	(1083, 46, '2018-12-27', 1),
	(1084, 49, '2018-12-19', 1),
	(1085, 49, '2018-12-20', 1),
	(1086, 14, '2018-12-04', 1),
	(1087, 14, '2018-12-05', 1),
	(1089, 14, '2018-12-07', 1),
	(1090, 14, '2018-12-08', 1),
	(1091, 14, '2018-12-10', 1),
	(1092, 14, '2018-12-11', 1),
	(1093, 14, '2018-12-12', 1),
	(1094, 14, '2018-12-13', 1),
	(1095, 14, '2018-12-14', 1),
	(1096, 14, '2018-12-15', 1),
	(1097, 14, '2018-12-17', 1),
	(1098, 14, '2018-12-18', 1),
	(1099, 14, '2018-12-19', 1),
	(1100, 14, '2018-12-20', 1),
	(1101, 14, '2018-12-21', 1),
	(1102, 14, '2018-12-22', 1),
	(1103, 14, '2018-12-24', 1),
	(1104, 14, '2018-12-25', 1),
	(1105, 14, '2018-12-26', 1),
	(1106, 14, '2018-12-27', 1),
	(1107, 14, '2018-12-28', 1),
	(1108, 14, '2018-12-29', 1),
	(1109, 61, '2018-12-04', 1),
	(1110, 49, '2018-12-28', 1),
	(1116, 4, '2018-12-10', 1),
	(1117, 4, '2018-12-11', 1),
	(1118, 4, '2018-12-12', 1),
	(1119, 4, '2018-12-13', 1),
	(1120, 4, '2018-12-14', 1),
	(1122, 4, '2018-12-17', 1),
	(1123, 4, '2018-12-18', 1),
	(1124, 4, '2018-12-19', 1),
	(1125, 4, '2018-12-20', 1),
	(1126, 4, '2018-12-21', 1),
	(1128, 4, '2018-12-24', 1),
	(1129, 4, '2018-12-25', 1),
	(1130, 4, '2018-12-26', 1),
	(1131, 4, '2018-12-27', 1),
	(1132, 4, '2018-12-28', 1),
	(1134, 49, '2018-12-27', 1),
	(1135, 49, '2018-12-26', 1),
	(1136, 49, '2018-12-25', 1),
	(1137, 49, '2018-12-24', 1),
	(1138, 55, '2018-12-31', 1),
	(1139, 22, '2018-12-06', 1),
	(1140, 64, '2018-12-04', 1),
	(1141, 64, '2018-12-05', 1),
	(1142, 64, '2018-12-06', 1),
	(1145, 64, '2018-12-10', 1),
	(1146, 64, '2018-12-11', 1),
	(1147, 64, '2018-12-12', 1),
	(1148, 64, '2018-12-13', 1),
	(1149, 64, '2018-12-14', 1),
	(1151, 64, '2018-12-17', 1),
	(1152, 64, '2018-12-18', 1),
	(1153, 64, '2018-12-19', 1),
	(1154, 64, '2018-12-20', 1),
	(1157, 64, '2018-12-24', 1),
	(1158, 64, '2018-12-25', 1),
	(1159, 64, '2018-12-26', 1),
	(1160, 64, '2018-12-27', 1),
	(1161, 64, '2018-12-28', 1),
	(1163, 65, '2018-12-04', 1),
	(1164, 65, '2018-12-05', 1),
	(1165, 65, '2018-12-06', 1),
	(1166, 65, '2018-12-07', 1),
	(1168, 65, '2018-12-10', 1),
	(1169, 65, '2018-12-11', 1),
	(1170, 65, '2018-12-12', 1),
	(1171, 65, '2018-12-13', 1),
	(1172, 65, '2018-12-14', 1),
	(1173, 65, '2018-12-15', 1),
	(1174, 65, '2018-12-17', 1),
	(1175, 65, '2018-12-18', 1),
	(1176, 65, '2018-12-19', 1),
	(1177, 65, '2018-12-20', 1),
	(1178, 65, '2018-12-21', 1),
	(1180, 65, '2018-12-24', 1),
	(1181, 65, '2018-12-25', 1),
	(1182, 65, '2018-12-26', 1),
	(1183, 65, '2018-12-27', 1),
	(1184, 65, '2018-12-28', 1),
	(1185, 65, '2018-12-29', 1),
	(1186, 22, '2018-12-07', 1),
	(1187, 66, '2018-12-04', 1),
	(1188, 66, '2018-12-05', 1),
	(1189, 66, '2018-12-06', 1),
	(1190, 66, '2018-12-07', 1),
	(1192, 66, '2018-12-10', 1),
	(1193, 66, '2018-12-11', 1),
	(1194, 66, '2018-12-12', 1),
	(1195, 66, '2018-12-13', 1),
	(1196, 66, '2018-12-14', 1),
	(1197, 66, '2018-12-15', 1),
	(1198, 66, '2018-12-17', 1),
	(1199, 66, '2018-12-18', 1),
	(1200, 66, '2018-12-19', 1),
	(1201, 66, '2018-12-20', 1),
	(1202, 66, '2018-12-21', 1),
	(1204, 66, '2018-12-24', 1),
	(1205, 66, '2018-12-25', 1),
	(1206, 66, '2018-12-26', 1),
	(1207, 66, '2018-12-27', 1),
	(1208, 66, '2018-12-28', 1),
	(1209, 66, '2018-12-29', 1),
	(1210, 7, '2018-12-04', 1),
	(1211, 7, '2018-12-05', 1),
	(1212, 7, '2018-12-06', 1),
	(1213, 7, '2018-12-07', 1),
	(1214, 7, '2018-12-10', 1),
	(1215, 7, '2018-12-11', 1),
	(1216, 7, '2018-12-12', 1),
	(1217, 7, '2018-12-13', 1),
	(1218, 7, '2018-12-14', 1),
	(1220, 7, '2018-12-17', 1),
	(1221, 7, '2018-12-18', 1),
	(1222, 7, '2018-12-19', 1),
	(1223, 7, '2018-12-20', 1),
	(1224, 7, '2018-12-21', 1),
	(1226, 7, '2018-12-24', 1),
	(1227, 7, '2018-12-25', 1),
	(1228, 7, '2018-12-26', 1),
	(1229, 7, '2018-12-27', 1),
	(1230, 7, '2018-12-28', 1),
	(1231, 66, '2018-12-31', 1),
	(1232, 67, '2018-12-04', 1),
	(1233, 67, '2018-12-05', 1),
	(1234, 67, '2018-12-06', 1),
	(1235, 67, '2018-12-07', 1),
	(1237, 67, '2018-12-10', 1),
	(1238, 67, '2018-12-11', 1),
	(1239, 67, '2018-12-12', 1),
	(1240, 67, '2018-12-13', 1),
	(1241, 67, '2018-12-14', 1),
	(1243, 67, '2018-12-17', 1),
	(1244, 67, '2018-12-18', 1),
	(1245, 67, '2018-12-19', 1),
	(1246, 67, '2018-12-20', 1),
	(1247, 67, '2018-12-21', 1),
	(1249, 67, '2018-12-24', 1),
	(1250, 67, '2018-12-25', 1),
	(1251, 67, '2018-12-26', 1),
	(1252, 67, '2018-12-27', 1),
	(1253, 67, '2018-12-28', 1),
	(1255, 67, '2018-12-15', 1),
	(1256, 67, '2018-12-29', 1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table verification.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table verification.payments: ~0 rows (approximately)
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;

-- Dumping structure for table verification.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table verification.users: ~67 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`) VALUES
	(1, 'Le Thi Trang', 'tranglt8@cyberspace.vn'),
	(2, 'Pham Phu Hau', 'haupp1@cyberspace.vn'),
	(3, 'Nguyen Manh Hung', 'hungnm72@cyberspace.vn'),
	(4, 'Hoang Huy Hoang', 'hoanghh@cyberspace.vn'),
	(5, 'Nguyen Thanh Tung', 'tungnt112@cyberspace.vn'),
	(6, 'Nguyen Viet Hai', 'hainv25@cyberspace.vn'),
	(7, 'Nguyen Thi Lan Phuong', 'phuongntl8@cyberspace.vn'),
	(8, 'Dinh Xuan Tuyen', 'tuyendx@cyberspace.vn'),
	(9, 'Le Thi Thuy Dung', 'dungltt3@cyberspace.vn'),
	(10, 'Do Hoai Thu', 'thudh@cyberspace.vn'),
	(11, 'Nguyen Van Phu', 'phunv14@cyberspace.vn'),
	(12, 'Do Thi Hue', 'huedt23@cyberspace.vn'),
	(13, 'Pham Quang Son', 'sonpq3@cyberspace.vn'),
	(14, 'Nguyen Sy Anh', 'anhns3@cyberspace.vn'),
	(15, 'Doan Xuan Dung', 'dungdx4@cyberspace.vn'),
	(16, 'Tạ Trung Văn', 'vantt5@cyberspace.vn'),
	(17, 'Tran Dieu Linh', 'linhtd12@cyberspace.vn'),
	(18, 'Nguyen Dinh Nghi', 'nghind2@cyberspace.vn'),
	(19, 'Nguyen Anh Thai', 'thaina@cyberspace.vn'),
	(20, 'Do Ngoc Sang', 'sangdn1@cyberspace.vn'),
	(21, 'Pham Quang Hieu', 'hieupq@cyberspace.vn'),
	(22, 'Nguyen Thu Thuy', 'thuynt191@cyberspace.vn'),
	(23, 'Hoang Anh Phi', 'phiha@cyberspace.vn'),
	(24, 'Le Quang Minh', 'minhlq4@cyberspace.vn'),
	(25, 'Tran Nguyen Ban', 'bantn@cyberspace.vn'),
	(26, 'Nguyen Quoc Bao', 'baonq2@cyberspace.vn'),
	(27, 'Mai Van Tuan', 'tuanmv2@cyberspace.vn'),
	(28, 'Do Thi Hai Yen', 'yendth13@cyberspace.vn'),
	(29, 'Le Minh Tuan', 'tuanlm21@cyberspace.vn'),
	(30, 'Phan Thi Thu', 'thupt24@cyberspace.vn'),
	(31, 'Nguyen Khac Hung', 'hungnk9@cyberspace.vn'),
	(32, 'Hoang Giang', 'giangh@cyberspace.vn'),
	(33, 'Nguyen Phu Thiet', 'thietnp@cyberspace.vn'),
	(34, 'Bui Thi Huong Hanh', 'hanhbth@cyberspace.vn'),
	(35, 'Ha Phuong Thao', 'thaohp7@cyberspace.vn'),
	(36, 'Bui Thi Hong Hue', 'huebth@cyberspace.vn'),
	(37, 'Nguyen Thi Van Anh', 'anhntv22@cyberspace.vn'),
	(38, 'Nguyen Huu Quyen', 'quyennh4@cyberspace.vn'),
	(39, 'Nguyen Tien Thanh', 'thanhnt116@cyberspace.vn'),
	(40, 'Dang Khac Toan', 'toandk2@cyberspace.vn'),
	(41, 'Nguyen Ngoc Dung', 'dungnn7@cyberspace.vn'),
	(42, 'Do Van Hai', 'haidv21@cyberspace.vn'),
	(43, 'Dang Thu Thuy', 'thuydt20@cyberspace.vn'),
	(44, 'Nguyen Van Huy', 'huynv24@cyberspace.vn'),
	(45, 'Pham Van Dat', 'datpv9@cyberspace.vn'),
	(46, 'Le Quang Trung', 'trunglq12@cyberspace.vn'),
	(47, 'Nguyen Van Huyen', 'huyennv9@cyberspace.vn'),
	(48, 'Phan Huy Kinh', 'kinhph@cyberspace.vn'),
	(49, 'Pham Khac Tan', 'tanpk@cyberspace.vn'),
	(50, 'Truong Van Trang', 'trangtv5@cyberspace.vn'),
	(51, 'Bui Quoc Chinh', 'chinhbq1@cyberspace.vn'),
	(52, 'Luong Hoang Giang', 'gianglh10@cyberspace.vn'),
	(53, 'Nguyen Thi Trang', 'trangnt50@cyberspace.vn'),
	(54, 'Le Trung Kien', 'kienlt11@cyberspace.vn'),
	(55, 'Nguyen Thi Huyen My', 'mynth5@cyberspace.vn'),
	(56, 'Lam Quang Tung', 'tunglq5@cyberspace.vn'),
	(57, 'Do Van Tu', 'tudv3@cyberspace.vn'),
	(58, 'Tran Minh Hai', 'haitm@cyberspace.vn'),
	(59, 'Vu Huy Hoang', 'hoangvh4@cyberspace.vn'),
	(60, 'Ha Binh Xuyen', 'xuyenhb@cyberspace.vn'),
	(61, 'Le Hoang Long', 'longlh3@cyberspace.vn'),
	(62, 'Huynh Nguyen To Anh', 'anhhnt4@cyberspace.vn'),
	(63, 'Tong Ho Tra Linh', 'LinhTHT@cyberspace.vn'),
	(64, 'Nguyen Van Thinh', 'thinhnv20@cyberspace.vn'),
	(65, 'Hoang Tuan Minh', 'minhht1@cyberspace.vn'),
	(66, 'Pham Ngoc Thang', 'thangpn7@cyberspace.vn'),
	(67, 'Doan Danh Chinh', 'chinhdd1@cyberspace.vn');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
