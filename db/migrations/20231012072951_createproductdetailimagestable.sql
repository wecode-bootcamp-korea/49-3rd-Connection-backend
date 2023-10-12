-- migrate:up
CREATE TABLE `product_detail_images` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `url` VARCHAR(1000) NOT NULL,
  `product_id` INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

-- migrate:down
drop table product_detail_images
