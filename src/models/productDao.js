const { AppDataSource } = require('./dataSource');

const getProductDetail = async (id) => {
  const detailProducts = await AppDataSource.query(
    `SELECT
    products.id AS productId,
    products.name AS productName,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('url', product_detail_images.url))
     FROM product_detail_images
     WHERE products.id = product_detail_images.product_id
     GROUP BY product_detail_images.product_id) AS productDetailImages,
    products.images AS productImg,
    products.price AS originalPrice,
    products.discount_rate AS discountRate,
    (products.price * products.discount_rate)/100 As discountAmount,
    (products.price - (products.price * (products.discount_rate / 100))) AS totalPrice,
    COUNT(DISTINCT reviews.id) AS reviewNumbers,
    IFNULL( IFNULL(SUM(reviews.rating), 0) / IFNULL(COUNT(reviews.id), 1),0) AS Rating
FROM products
LEFT JOIN reviews ON products.id = reviews.product_id
WHERE products.id = ${id}
GROUP BY products.id;
  `
  );
  console.log('먼데', detailProducts);
  return detailProducts;
};

module.exports = {
  getProductDetail,
};
