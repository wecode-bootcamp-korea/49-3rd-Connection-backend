const { AppDataSource } = require('./dataSource');

const getProductDetail = async (id) => {
  const detailProducts = await AppDataSource.query(
    `SELECT
    products.id AS productId,
    products.name AS productName,
    JSON_ARRAYAGG(JSON_OBJECT('url', product_detail_images.url)) AS productDetailImages,
    products.images AS productImg,
    products.price AS originalPrice,
    products.discount_rate AS discountRate,
    (products.price - products.discount_price) As discountAmount,
    (products.price - (products.price * (products.discount_rate / 100))) AS totalPrice,
    COUNT(DISTINCT reviews.id) AS reviewNumbers,
    IFNULL(SUM(reviews.rating), 0) / COUNT(DISTINCT reviews.id) AS Rating
  FROM products
  LEFT JOIN product_detail_images ON products.id = product_detail_images.product_id
  LEFT JOIN reviews ON products.id = reviews.product_id
  WHERE products.id = ${id}
  GROUP BY products.id, products.name, products.price, products.discount_rate, products.discount_price
  `
  );
  console.log('먼데', detailProducts);
  return detailProducts;
};

module.exports = {
  getProductDetail,
};
