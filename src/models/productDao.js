const { AppDataSource } = require('./dataSource');

const getProductDetail = async (req, res) => {
  const detailProducts = await AppDataSource.query(
    `SELECT
    products.id AS productsId,
    products.name AS productsName,
    JSON_ARRAYAGG(JSON_OBJECT('url', product_detail_images.url)) AS productDetailImages,
    products.images AS productsImg,
    products.price AS originalPrice,
    products.discount_rate AS discountRate,
    products.discount_price AS discountAmount,
    (products.price - (products.price * (products.discount_rate / 100))) AS totalPrice,
    COUNT(DISTINCT reviews.id) AS reviewNumbers,
    IFNULL(SUM(reviews.rating), 0) / COUNT(DISTINCT reviews.id) AS Rating
  FROM products
  LEFT JOIN product_detail_images ON products.id = product_detail_images.product_id
  LEFT JOIN reviews ON products.id = reviews.product_id
  GROUP BY products.id, products.name, products.price, products.discount_rate, products.discount_price;
  `
  );
  return detailProducts;
};

module.exports = {
  getProductDetail,
};
