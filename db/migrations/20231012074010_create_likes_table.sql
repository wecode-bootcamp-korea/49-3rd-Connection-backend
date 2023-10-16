-- migrate:up
CREATE TABLE `likes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  CONSTRAINT unique_user_product UNIQUE (user_id, product_id),
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  
);

-- migrate:down

drop table likes