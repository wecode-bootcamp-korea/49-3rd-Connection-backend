-- migrate:up

ALTER TABLE users MODIFY COLUMN `password` VARCHAR(255) NULL;
-- migrate:down

ALTER TABLE users MODIFY COLUMN `password` VARCHAR(255) NOT NULL;