-- migrate:up
CREATE TABLE `sellers` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `image` VARCHAR(1000) NOT NULL,
  `zip_code` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `address_details` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL, 
  `updated_at` TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- migrate:down
drop table sellers
