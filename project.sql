-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Мар 19 2025 г., 17:10
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Pavel344`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Authorization`
--

CREATE TABLE `Authorization` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `Authorization`
--

INSERT INTO `Authorization` (`id`, `login`, `password`, `employee_id`) VALUES
(3, 'admin', 'admin', NULL),
(6, 'test', '000', NULL),
(9, '123', '123', NULL),
(10, 'test', 'test', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `ChangeLog`
--

CREATE TABLE `ChangeLog` (
  `id` int(11) NOT NULL,
  `table_name` varchar(255) DEFAULT NULL,
  `operation_type` enum('INSERT','UPDATE','DELETE') DEFAULT NULL,
  `old_data` text DEFAULT NULL,
  `new_data` text DEFAULT NULL,
  `changed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `ChangeLog`
--

INSERT INTO `ChangeLog` (`id`, `table_name`, `operation_type`, `old_data`, `new_data`, `changed_at`) VALUES
(1, 'Services', 'UPDATE', '52', '52', '2025-03-09 10:49:21'),
(2, 'Services', 'UPDATE', '54', '54', '2025-03-09 10:58:02'),
(3, 'Services', 'UPDATE', '54', '54', '2025-03-09 10:58:23'),
(4, 'Services', 'INSERT', NULL, '61', '2025-03-09 11:02:52'),
(5, 'Services', 'DELETE', '61', NULL, '2025-03-09 11:03:22'),
(6, 'Services', 'UPDATE', '52', '52', '2025-03-09 15:50:50'),
(7, 'Services', 'INSERT', NULL, '62', '2025-03-10 16:49:26'),
(8, 'Services', 'UPDATE', '62', '62', '2025-03-10 16:52:00'),
(9, 'Services', 'UPDATE', '62', '62', '2025-03-10 16:59:52'),
(10, 'Services', 'UPDATE', '62', '62', '2025-03-10 17:09:02'),
(11, 'Services', 'UPDATE', '60', '60', '2025-03-10 17:10:25'),
(12, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:11:47'),
(13, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:12:05'),
(14, 'Services', 'DELETE', '60', NULL, '2025-03-10 17:12:50'),
(15, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:13:21'),
(16, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:14:16'),
(17, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:23:15'),
(18, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:23:32'),
(19, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:23:40'),
(20, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:23:56'),
(21, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:26:50'),
(22, 'Services', 'UPDATE', '47', '47', '2025-03-10 17:31:03'),
(23, 'Services', 'UPDATE', '47', '47', '2025-03-10 17:31:20'),
(24, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:31:36'),
(25, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:31:47'),
(26, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:32:12'),
(27, 'Services', 'UPDATE', '55', '55', '2025-03-10 17:32:26'),
(28, 'Services', 'UPDATE', '62', '62', '2025-03-10 17:34:34'),
(29, 'Services', 'UPDATE', '62', '62', '2025-03-10 17:34:39'),
(30, 'Services', 'UPDATE', '47', '47', '2025-03-12 15:48:59'),
(31, 'Services', 'UPDATE', '54', '54', '2025-03-12 15:54:14'),
(32, 'Services', 'UPDATE', '62', '62', '2025-03-12 15:54:18'),
(33, 'Services', 'UPDATE', '62', '62', '2025-03-12 15:54:20'),
(34, 'Services', 'UPDATE', '62', '62', '2025-03-12 15:54:25'),
(35, 'Services', 'UPDATE', '62', '62', '2025-03-12 16:00:26'),
(36, 'Services', 'UPDATE', '62', '62', '2025-03-12 16:00:30'),
(37, 'Services', 'UPDATE', '62', '62', '2025-03-12 16:00:32'),
(38, 'Services', 'INSERT', NULL, '63', '2025-03-12 16:01:19'),
(39, 'Services', 'UPDATE', '62', '62', '2025-03-12 16:01:30'),
(40, 'Services', 'UPDATE', '62', '62', '2025-03-12 16:02:59'),
(41, 'Services', 'INSERT', NULL, '64', '2025-03-12 16:08:13'),
(42, 'Services', 'UPDATE', '64', '64', '2025-03-12 16:09:03'),
(43, 'Services', 'DELETE', '64', NULL, '2025-03-12 16:09:04'),
(44, 'Services', 'UPDATE', '47', '47', '2025-03-15 01:32:09'),
(45, 'Services', 'UPDATE', '62', '62', '2025-03-15 01:32:11'),
(46, 'Services', 'UPDATE', '54', '54', '2025-03-15 01:41:44'),
(47, 'Services', 'UPDATE', '55', '55', '2025-03-15 01:41:55'),
(48, 'Services', 'UPDATE', '55', '55', '2025-03-15 01:41:57'),
(49, 'Services', 'UPDATE', '52', '52', '2025-03-15 01:42:12'),
(50, 'Services', 'UPDATE', '55', '55', '2025-03-15 01:42:15'),
(51, 'Services', 'UPDATE', '55', '55', '2025-03-15 01:42:24'),
(52, 'Services', 'UPDATE', '52', '52', '2025-03-15 01:42:26');

-- --------------------------------------------------------

--
-- Структура таблицы `Employees`
--

CREATE TABLE `Employees` (
  `id` int(11) NOT NULL,
  `family` varchar(255) NOT NULL,
  `count_work` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `Employees`
--

INSERT INTO `Employees` (`id`, `family`, `count_work`) VALUES
(17, 'Пипкин', 2),
(28, 'Хвостов', 1),
(29, 'Иванов', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `PromoCode`
--

CREATE TABLE `PromoCode` (
  `id` int(11) NOT NULL,
  `promo_code` varchar(255) NOT NULL,
  `family` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `PromoCode`
--

INSERT INTO `PromoCode` (`id`, `promo_code`, `family`) VALUES
(1, 'PROMO123', 'Иванов'),
(2, 'DISCOUNT456', 'Петров'),
(3, 'SALE789', 'Сидоров'),
(4, 'fjsd3214аыв', 'Пупкин'),
(25, 'dfg', 'dfg'),
(51, '123', '123'),
(52, 'qwe', 'qwe');

-- --------------------------------------------------------

--
-- Структура таблицы `Sclad`
--

CREATE TABLE `Sclad` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `product_count` varchar(100) NOT NULL,
  `sclad_type` varchar(255) NOT NULL,
  `product_opisanie` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `Sclad`
--

INSERT INTO `Sclad` (`id`, `name`, `product_count`, `sclad_type`, `product_opisanie`) VALUES
(1, 'Склад 1', '100', 'Тип A', 'Описание продукта 1'),
(2, 'Склад 2', '200', 'Тип B', 'Описание продукта 2'),
(3, 'Склад 3', '150', 'Тип A', 'Описание продукта 3'),
(4, 'Склад 4', '300', 'Тип C', 'Описание продукта 4'),
(6, 'Шариц123', '90', 'Оптовый1', 'аываыв'),
(7, 'фыв', '12', 'фыв', '123');

-- --------------------------------------------------------

--
-- Структура таблицы `Services`
--

CREATE TABLE `Services` (
  `id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT 'Открыто',
  `comments` text DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `Opisanie` text DEFAULT NULL,
  `Cost` int(11) DEFAULT NULL,
  `TimeOpen` varchar(60) DEFAULT NULL,
  `TimeClose` varchar(60) DEFAULT NULL,
  `Surname` varchar(255) DEFAULT NULL,
  `Process_date` varchar(60) DEFAULT NULL,
  `Person_come` varchar(60) NOT NULL,
  `employeer` varchar(60) DEFAULT NULL,
  `telephone` varchar(60) DEFAULT NULL,
  `promo_code_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `Services`
--

INSERT INTO `Services` (`id`, `status`, `comments`, `employee_id`, `Opisanie`, `Cost`, `TimeOpen`, `TimeClose`, `Surname`, `Process_date`, `Person_come`, `employeer`, `telephone`, `promo_code_id`) VALUES
(47, 'Закрыто', 'фыв', NULL, 'asdаоывавыа да', 600, '2025-02-12', '2025-03-15', 'Сиренко Дарья', NULL, '25.02.2025', 'Иванов', NULL, NULL),
(52, 'Закрыто', 'фыв', NULL, 'afsdf', 800, '2025-02-22', '2025-03-15', 'Хвостов Павел', NULL, '20.23.2024', 'Пипкин', '79098469873', NULL),
(54, 'В процессе', 'фыв', NULL, 'ываыв', 30000, '2025-02-26', '2025-03-09', 'Бибко Николай', '2025-03-15', '25.02.2025', 'Хвостов', '79098469873', NULL),
(55, 'В процессе', 'фыв', NULL, 'asdаоывавыа да', 6000, '2025-02-27', '2025-03-15', '123', '2025-03-15', '25.02.2025', 'Иванов', '79098469873', NULL),
(62, 'Открыто', 'fsdf', NULL, 'sdf', 300, '2025-03-11', NULL, 'Фёдоров123', NULL, '27.02.2025', 'Пипкин', '89098469873', NULL),
(63, 'Открыто', 'Какой то комент', NULL, 'Ботекс верхней губы', 3000, '2025-03-13', NULL, 'Хвостов Павел', NULL, '25.02.2025', 'Пипкин', '89098469873', NULL);

--
-- Триггеры `Services`
--
DELIMITER $$
CREATE TRIGGER `after_delete_services` AFTER DELETE ON `Services` FOR EACH ROW BEGIN
    INSERT INTO ChangeLog (table_name, operation_type, old_data)
    VALUES ('Services', 'DELETE', OLD.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_services` AFTER INSERT ON `Services` FOR EACH ROW BEGIN
    INSERT INTO ChangeLog (table_name, operation_type, new_data)
    VALUES ('Services', 'INSERT', NEW.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_services` AFTER UPDATE ON `Services` FOR EACH ROW BEGIN
    INSERT INTO ChangeLog (table_name, operation_type, old_data, new_data)
    VALUES ('Services', 'UPDATE', OLD.id, NEW.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `ServicesCatalog`
--

CREATE TABLE `ServicesCatalog` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `ServicesCatalog`
--

INSERT INTO `ServicesCatalog` (`id`, `service_name`, `description`, `price`, `duration`) VALUES
(2, 'Услуга 2', 'Описание услуги 2', 150.50, '02:00:00'),
(3, 'Услуга 3', 'Описание услуги 3', 200.00, '01:30:00'),
(5, 'Пилинг', 'Пилинг ногтей', 3000.00, '00:30:00');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Authorization`
--
ALTER TABLE `Authorization`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employee_authorization` (`employee_id`);

--
-- Индексы таблицы `ChangeLog`
--
ALTER TABLE `ChangeLog`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `PromoCode`
--
ALTER TABLE `PromoCode`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Sclad`
--
ALTER TABLE `Sclad`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Services`
--
ALTER TABLE `Services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employee_id` (`employee_id`),
  ADD KEY `promo_code_id` (`promo_code_id`);

--
-- Индексы таблицы `ServicesCatalog`
--
ALTER TABLE `ServicesCatalog`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Authorization`
--
ALTER TABLE `Authorization`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `ChangeLog`
--
ALTER TABLE `ChangeLog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT для таблицы `Employees`
--
ALTER TABLE `Employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `PromoCode`
--
ALTER TABLE `PromoCode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT для таблицы `Sclad`
--
ALTER TABLE `Sclad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `Services`
--
ALTER TABLE `Services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT для таблицы `ServicesCatalog`
--
ALTER TABLE `ServicesCatalog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Authorization`
--
ALTER TABLE `Authorization`
  ADD CONSTRAINT `fk_employee_authorization` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Services`
--
ALTER TABLE `Services`
  ADD CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`promo_code_id`) REFERENCES `PromoCode` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
