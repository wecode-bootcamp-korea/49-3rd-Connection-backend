const { AppDataSource } = require('./dataSource');

// 장바구니 조회

const getCartDao = async (userId) => {
  const checkCart = await AppDataSource.query(
    `SELECT
    sellerId,
    sellerName,
    sellerImage,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'productId', product_id,
        'productName', product_name,
        'productImage', product_image,
        'quantity', quantity,
        'originalPrice', price,
        'discountRate', discount_rate
      )
    ) AS products
  FROM (
    SELECT
      products.seller_id AS sellerId,
      products.id AS product_id,
      products.name AS product_name,
      carts.quantity,
      products.price,
      products.discount_rate,
      products.images AS product_image,
      sellers.name AS sellerName,
      sellers.image AS sellerImage
    FROM users
    INNER JOIN carts ON users.id=carts.user_id
    INNER JOIN products ON carts.product_id = products.id
    INNER JOIN sellers ON products.seller_id = sellers.id
    WHERE users.id = ?
  ) AS subquery
  GROUP BY sellerId;`,
    [userId]
  );
  return checkCart;
};

// 장바구니 간편조회
const easyCheckDao = async (userId, productId) => {
  const checkEasy = await AppDataSource.query(
    `SELECT
    id AS cartId,
    product_id AS productId,
    quantity
    FROM carts WHERE user_id = ? and product_id = ?`,
    [userId, productId]
  );
  return checkEasy;
};

//장바구니 생성
const makeCartDao = async (userId, productId, quantity) => {
  const creatCart = await AppDataSource.query(
    ` INSERT INTO carts (user_id, product_id, quantity) VALUES (?,?,?)`,
    [userId, productId, quantity]
  );
  return creatCart;
};

// 장바구니 수량 변경
const updateQuantityDao = async (userId, productId, quantity) => {
  const updateQuantity = await AppDataSource.query(
    `UPDATE carts SET quantity =? WHERE user_id=? and product_id=?`,
    [quantity, userId, productId]
  );
  return updateQuantity;
};

// 장바구니 상태변경
const updateStatusDao = async (userId, productId) => {
  const updateStatus = await AppDataSource.query(
    `UPDATE carts SET status = status + 1 WHERE user_id=? and product_id=?`,
    [userId, productId]
  );
  return updateStatus;
};

//장바구니 삭제 (삭제버튼)
const deletCartDao = async (userId, productId) => {
  const deletCart = await AppDataSource.query(
    `DELETE FROM carts WHERE user_id = ? AND product_id = ?`,
    [userId, productId]
  );
  return deletCart;
};

module.exports = {
  getCartDao,
  easyCheckDao,
  makeCartDao,
  updateQuantityDao,
  deletCartDao,
  updateStatusDao,
};
