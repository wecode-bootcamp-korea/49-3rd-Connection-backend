const { AppDataSource } = require('./dataSource');

const getSellerCoordinates = async () => {
  const seller = await AppDataSource.query(
    `SELECT 
    id,
    latitude,
    longitude
    FROM Sellers
    `
  );
  return seller;
};

const getUserCoordinates = async (userId) => {
  const user = await AppDataSource.query(
    `SELECT 
    id,
    latitude,
    longitude
    FROM users
    WHERE users.id=${userId}
    `
  );
  console.log(user);
  return user;
};

const getProductAmount = async (whereQuery, nearbySellerIds) => {
  const product = await AppDataSource.query(
    `SELECT * FROM products WHERE product_category_id
    ${whereQuery}
    AND products.seller_id IN (${nearbySellerIds.join(', ')})`
  );
  return product.length;
};

const getProductDetail = async (id) => {
  const detailProducts = await AppDataSource.query(
    `SELECT
    products.id AS productId,
    products.name AS productName,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('url', product_detail_images.url, 'comments', product_detail_images.comments))
     FROM product_detail_images
     WHERE products.id = product_detail_images.product_id
     GROUP BY product_detail_images.product_id) AS productDetailImages,
    products.images AS productImg,
    products.price AS originalPrice,
    products.discount_rate AS discountRate,
    (products.price * products.discount_rate)/100 AS discountAmount,
    (products.price - (products.price * (products.discount_rate / 100))) AS totalPrice,
    COUNT(DISTINCT reviews.id) AS reviewNumbers,
    IFNULL( IFNULL(SUM(reviews.rating), 0) / IFNULL(COUNT(reviews.id), 1),0) AS rating,
    sellers.latitude AS latitude,
    sellers.longitude AS longitude
    FROM products
    LEFT JOIN reviews ON products.id = reviews.product_id
    INNER JOIN sellers ON products.seller_Id = sellers.id
    WHERE products.id = ${id}
    GROUP BY products.id;
  `
  );
  return detailProducts;
};

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
const getRandomSellerId = async (nearbySellerIds) => {
  const sellers = await AppDataSource.query(
    `SELECT id FROM sellers 
    WHERE id IN (${nearbySellerIds.join(', ')})
    ORDER BY rand() LIMIT 3`
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

const getProducts = async (
  joinQuery = '',
  whereQuery = '',
  nearbySellerIds,
  orderingQuery = '',
  limitOffsetQuery = ''
) => {
  console.log(nearbySellerIds);
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
          ${joinQuery}
          WHERE 1=1
          ${whereQuery}
          AND products.seller_id IN (${nearbySellerIds.join(', ')})
          ${orderingQuery}
          ${limitOffsetQuery}
          `;
  console.log(query);
  const products = await AppDataSource.query(query);
  return products;
};

const getProduct = async (
  joinQuery = '',
  whereQuery = '',
  orderingQuery = '',
  limitOffsetQuery = ''
) => {
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
          ${joinQuery}
          WHERE 1=1
          ${whereQuery}
          ${orderingQuery}
          ${limitOffsetQuery}
          `;

  const products = await AppDataSource.query(query);
  return products;
};

const findProductByName = async (name) => {
  const [result] = await AppDataSource.query(
    `
      SELECT
        name
      FROM
        products
      WHERE
        name = ?
    `,
    [name]
  );
  console.log('@@@@@@@@!!@@@', result);
  return !!result;
};

module.exports = {
  getProduct,
  getUserCoordinates,
  getSellerCoordinates,
  getProductAmount,
  getTotalCategoryId,
  getRandomSellerId,
  getCategoryNameById,
  getSellerNameById,
  getProducts,
  getProductDetail,
  findProductByName,
};
