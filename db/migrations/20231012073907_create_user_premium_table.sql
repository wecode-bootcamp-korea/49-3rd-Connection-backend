-- migrate:up
CREATE TABLE `user_premium` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `payment_id` INT NOT NULL,
  `price` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (payment_id) REFERENCES payments (id) ON DELETE CASCADE
);

-- migrate:down

drop table user_premium