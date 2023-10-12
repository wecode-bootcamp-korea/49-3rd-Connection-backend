-- migrate:up
CREATE TABLE `seller_premium` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `seller_id` INT NOT NULL,
  `payment_id` INT NOT NULL,
  `price` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES sellers (id) ON DELETE CASCADE,
  FOREIGN KEY (payment_id) REFERENCES payments (id) ON DELETE CASCADE
);

-- migrate:down
drop table seller_premium
