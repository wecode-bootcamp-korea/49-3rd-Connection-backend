const { AppDataSource } = require('./data-source');

let query = `SELECT 
products.id AS id,
products.name AS name,
product_categories.name AS category,
(
SELECT JSON_ARRAYAGG(
JSON_OBJECT(
    "id" products.id,
    "name" products.name,
    "url" products.images,
    "price" products.price,
    "discount_rate” products.discount_rate,
    "discount_price"products.discount_price,
    "total_price" products.price - (products.price * (products.discount_rate / 100)) AS total_price
    FROM products
    INNER JOIN products ON products_category.id = product_categories.id;
products.price AS originalPrice,
products.discount_rate AS discount_Rate
)
