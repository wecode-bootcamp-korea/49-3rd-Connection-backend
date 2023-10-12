-- migrate:up
CREATE TABLE `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `kakao` VARCHAR(255),
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(255) NOT NULL,
  `zip_code` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `address_details` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP
);

-- migrate:down

drop table users