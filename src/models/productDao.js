const { AppDataSource } = require('./dataSource');

const getProducts = async (
  selectQuery,
  orderingQuery,
  joinQuery,
  whereQuery,
  limitOffsetQuery
) => {
  let query = `
  SELECT 
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
    IFNULL(
      (
        SELECT 
          IFNULL(SUM(reviews.rating), 0) / IFNULL(COUNT(reviews.product_id), 1)
        FROM reviews
        WHERE reviews.product_id = products.id
      ), 0
    ) AS rating
  ${selectQuery}
  FROM products
  ${joinQuery}
  WHERE 1=1
  ${whereQuery}
  ${orderingQuery}
  ${limitOffsetQuery}
  `;

  const products = await AppDataSource.query(query);
  return products;
};

module.exports = {
  getProducts,
};
