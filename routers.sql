-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Час створення: Чрв 03 2023 р., 19:33
-- Версія сервера: 10.4.28-MariaDB
-- Версія PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `routers`
--

-- --------------------------------------------------------

--
-- Структура таблиці `citys`
--

CREATE TABLE `citys` (
  `id` int(11) NOT NULL,
  `City` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `citys`
--

INSERT INTO `citys` (`id`, `City`) VALUES
(1, 'Львів'),
(2, 'Київ'),
(3, 'Тернопіль'),
(4, 'Дніпро'),
(5, 'Харьків'),
(6, 'Луцьк'),
(7, 'Кривий-Ріг'),
(8, 'Івано-Франківськ'),
(9, 'Житомир'),
(10, 'Ужгород'),
(11, 'Чернігів'),
(714154866, 'Севастополь'),
(2082801176, 'Миколаїв');

-- --------------------------------------------------------

--
-- Структура таблиці `trains`
--

CREATE TABLE `trains` (
  `id` int(20) NOT NULL,
  `startCity_id` int(11) NOT NULL,
  `finishCity_id` int(11) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп даних таблиці `trains`
--

INSERT INTO `trains` (`id`, `startCity_id`, `finishCity_id`, `Date`) VALUES
(1, 2, 1, '2023-06-16'),
(2, 3, 2, '2023-06-12'),
(4, 2, 3, '2023-06-19'),
(5, 3, 2, '2023-06-19'),
(6, 4, 2, '2023-06-15'),
(7, 1, 6, '2023-06-11'),
(8, 1, 7, '2023-06-19'),
(9, 3, 2, '2023-06-10'),
(10, 6, 4, '2023-06-11'),
(12, 3, 1, '2023-07-10'),
(15, 8, 9, '2023-06-30'),
(17, 8, 6, '2023-06-30'),
(1048575, 1, 6, '2023-06-11'),
(1153693371, 10, 11, '2023-06-19'),
(1294030949, 1, 6, '2023-06-19'),
(1680503310, 2, 1, '2023-07-10'),
(1719326434, 7, 1, '2023-06-11'),
(1920358331, 9, 1, '2023-06-19'),
(1984082859, 11, 1, '2023-06-19'),
(2147483647, 1, 3, '2023-06-04');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `citys`
--
ALTER TABLE `citys`
  ADD PRIMARY KEY (`id`);

--
-- Індекси таблиці `trains`
--
ALTER TABLE `trains`
  ADD PRIMARY KEY (`id`),
  ADD KEY `startCity_id` (`startCity_id`,`finishCity_id`),
  ADD KEY `finishCity_id` (`finishCity_id`);

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `trains`
--
ALTER TABLE `trains`
  ADD CONSTRAINT `trains_ibfk_1` FOREIGN KEY (`startCity_id`) REFERENCES `citys` (`id`),
  ADD CONSTRAINT `trains_ibfk_2` FOREIGN KEY (`finishCity_id`) REFERENCES `citys` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
