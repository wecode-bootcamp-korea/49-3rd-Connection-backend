-- migrate:up
CREATE TABLE `products` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `images` VARCHAR(2000) NOT NULL,
  `price` INT NOT NULL,
  `quantity` INT NOT NULL,
  `discount_rate` INT,
  `product_category_id` INT NOT NULL,
  `seller_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_category_id) REFERENCES product_categories (id) ON DELETE CASCADE,
  FOREIGN KEY (seller_id) REFERENCES sellers (id) ON DELETE CASCADE
);

-- migrate:down
drop table products
