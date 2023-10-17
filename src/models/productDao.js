const { AppDataSource } = require('./dataSource');

const getTotalCategoryId = async () => {
  const ID = await AppDataSource.query(`SELECT id FROM product_categories`);

  return ID;
};

const getCategoryNameById = async (categoryId) => {
  const name = await AppDataSource.query(
    `select product_categories.category_name FROM product_categories
    WHERE product_categories.id=${categoryId}`
  );

  return name;
};

const getRandomSellerId = async () => {
  const sellers = await AppDataSource.query(
    `SELECT id FROM sellers ORDER BY rand() LIMIT 3;`
  );
  return sellers;
};

const getSellerNameById = async (sellerId) => {
  const name = await AppDataSource.query(
    `select name FROM sellers
    WHERE sellers.id=${sellerId}`
  );

  return name;
};

const getTotalProductBySellerId = async (sellerId) => {
  let query = `SELECT 
  products.id AS productId,
  products.name AS productName,
  products.images AS productImg,
  products.price AS originalPrice,
  products.discount_rate AS discountRate,
  products.price * (products.discount_rate / 100) AS discountAmount,
  products.price - (products.price * (products.discount_rate / 100)) AS totalPrice,
  (
    SELECT COUNT(reviews.product_id)
    FROM reviews
    WHERE reviews.product_id = products.id
) AS reviewNumber,
  IFNULL((
    SELECT IFNULL(SUM(reviews.rating), 0) / IFNULL(COUNT(reviews.product_id), 1)
    FROM reviews
    WHERE reviews.product_id = products.id), 0) AS rating
   FROM products
   LEFT JOIN product_categories ON products.product_category_id = product_categories.id
   WHERE products.product_category_id=${sellerId}`;

  const product = await AppDataSource.query(query);
  return product;
};

const getTotalProductByCategoryId = async (categoryId) => {
  let query = `SELECT 
  products.id AS productId,
  products.name AS productName,
  products.images AS productImg,
  products.price AS originalPrice,
  products.discount_rate AS discountRate,
  products.price * (products.discount_rate / 100) AS discountAmount,
  products.price - (products.price * (products.discount_rate / 100)) AS totalPrice,
  (
    SELECT COUNT(reviews.product_id)
    FROM reviews
    WHERE reviews.product_id = products.id
) AS reviewNumber,
  IFNULL((
    SELECT IFNULL(SUM(reviews.rating), 0) / IFNULL(COUNT(reviews.product_id), 1)
    FROM reviews
    WHERE reviews.product_id = products.id), 0) AS rating
   FROM products
   LEFT JOIN product_categories ON products.product_category_id = product_categories.id
   WHERE products.product_category_id=${categoryId}`;
  const product = await AppDataSource.query(query);
  return product;
};

module.exports = {
  getTotalCategoryId,
  getRandomSellerId,
  getTotalProductBySellerId,
  getTotalProductByCategoryId,
  getCategoryNameById,
  getSellerNameById,
};
