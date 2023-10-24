-- migrate:up
ALTER TABLE `carts` ADD COLUMN `status` INT NOT NULL DEFAULT 0;

-- migrate:down

