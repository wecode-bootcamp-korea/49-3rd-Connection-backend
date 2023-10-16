-- migrate:up
CREATE TABLE `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `kakao` VARCHAR(255),
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(255) NOT NULL,
  `zip_code` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `address_details` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down

drop table users