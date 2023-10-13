const { AppDataSource } = require('./dataSource');

const getProductByCategoryId = async (
  categoryId,
  orderingQuery,
  limit,
  offset
) => {
  let query = `SELECT 
  products.id AS productId,
  products.name AS productName,
  products.images AS productImg,
  products.price AS originalPrice,
  products.discount_rate AS discountRate,
  products.price * (products.discount_rate / 100) AS discountAmount,
  products.price - (products.price * (products.discount_rate / 100)) AS price,
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

  query += orderingQuery;

  query += `
    LIMIT ${limit} OFFSET ${offset}`;

  const products = await AppDataSource.query(query);
  return products;
};

const getProductBySellerId = async (sellerId, orderingQuery, limit, offset) => {
  const query = `SELECT 
  products.id AS productId,
  products.name AS productName,
  products.images AS productImg,
  products.price AS originalPrice,
  products.discount_rate AS discountRate,
  products.price * (products.discount_rate / 100) AS discountAmount,
  products.price - (products.price * (products.discount_rate / 100)) AS price,
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
   WHERE products.seller_id=${sellerId}`;

  query += orderingQuery;

  query += `
    LIMIT ${limit} OFFSET ${offset}`;
  ㅊ;

  const products = await AppDataSource.query(query);
  return products;
};

module.exports = {
  getProductByCategoryId,
  getProductBySellerId,
};
