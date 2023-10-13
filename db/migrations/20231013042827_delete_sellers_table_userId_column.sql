-- migrate:up
ALTER TABLE `sellers` DROP FOREIGN KEY `sellers_ibfk_1`;
ALTER TABLE sellers DROP COLUMN user_id;

-- migrate:down

ALTER TABLE `sellers` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;