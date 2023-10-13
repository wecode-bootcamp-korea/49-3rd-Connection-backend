-- migrate:up
ALTER TABLE users ADD seller_id INT NULL;
ALTER TABLE `users` ADD FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) ON DELETE CASCADE;
-- migrate:down

ALTER TABLE users DROP COLUMN seller_id;
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;