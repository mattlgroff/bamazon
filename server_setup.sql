-- Drops the bamazon_DB if it already exists --
DROP DATABASE IF EXISTS `bamazon_DB`;
-- Create a database called programming_db --
CREATE DATABASE `bamazon_DB`;

USE `bamazon_DB`;

CREATE TABLE `products`(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  `id` INTEGER(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(25) NOT NULL,
  `price` DECIMAL(10,2) UNSIGNED NOT NULL,
  `stock_left` INTEGER(11) UNSIGNED NOT NULL
  -- -- Creates a boolean column called "in_stock" which will automatically fill --
  -- -- with true when a new row is made and the value isn't otherwise defined. --
  -- `in_stock` BOOLEAN DEFAULT true NOT NULL
);

-- Creates new rows
INSERT INTO `products` (name, price, stock_left)
  VALUES ("Hot Dog", 5.00, 1);

INSERT INTO `products` (name, price, stock_left) 
  VALUES("Hamburger", 10.00, 5);
  
