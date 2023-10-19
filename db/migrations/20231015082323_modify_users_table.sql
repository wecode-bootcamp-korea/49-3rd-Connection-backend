-- migrate:up

ALTER TABLE users MODIFY COLUMN `phone_number` VARCHAR(255) NULL;
ALTER TABLE users MODIFY COLUMN `zip_code` VARCHAR(255) NULL;
ALTER TABLE users MODIFY COLUMN `address` VARCHAR(255) NULL;
ALTER TABLE users MODIFY COLUMN `address_details` VARCHAR(255) NULL;

-- migrate:down

ALTER TABLE `users` MODIFY COLUMN `phone_number` VARCHAR(255) NOT NULL;
ALTER TABLE `users` MODIFY COLUMN `zip_code` VARCHAR(255) NOT NULL;
ALTER TABLE `users` MODIFY COLUMN `address` VARCHAR(255) NOT NULL;
ALTER TABLE `users` MODIFY COLUMN `address_details` VARCHAR(255) NOT NULL;