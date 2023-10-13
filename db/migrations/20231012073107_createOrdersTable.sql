-- migrate:up
CREATE TABLE `orders` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `total_price` INT NOT NULL,
  `shipping_method` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  `payment_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (payment_id) REFERENCES payments (id) ON DELETE CASCADE
);

-- migrate:down

drop table orders