-- migrate:up
  ALTER TABLE product_detail_images ADD COLUMN `comments` VARCHAR(1000) NOT NULL


-- migrate:down

drop table product_detail_images COLUMN `comments` VARCHAR(1000) NOT NULL
