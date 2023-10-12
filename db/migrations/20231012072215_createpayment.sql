-- migrate:up
CREATE TABLE `payments` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `method` VARCHAR(255) NOT NULL
);


-- migrate:down
drop table payments