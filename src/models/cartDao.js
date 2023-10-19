const { AppDataSource } = require('./dataSource');

// 장바구니 조회

const getCartDao = async (userId) => {
  const checkCart = await AppDataSource.query(
    `SELECT
    seller_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'productId', product_id,
        'productName', product_name,
        'quantity', quantity,
        'originalPrice', price,
        'discountRate', discount_rate
      )
    ) AS products
  FROM (
    SELECT
      products.seller_id,
      products.id AS product_id,
      products.name AS product_name,
      carts.quantity,
      products.price,
      products.discount_rate
    FROM users
    INNER JOIN carts ON users.id=carts.user_id
    INNER JOIN products ON carts.product_id = products.id
    WHERE users.id = ?
  ) AS subquery
  GROUP BY seller_id;`,
    [userId]
  );
  return checkCart;
};

// 장바구니 간편조회
const easyCheckDao = async (userId, productId) => {
  const checkEasy = await AppDataSource.query(
    `SELECT * FROM carts WHERE user_id = ? and product_id = ?`,
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
    `UPDATE carts SET quantity =? WHERE user_id=? and product_id=?;`,
    [quantity, userId, productId]
  );
  return updateQuantity;
};

//장바구니 삭제 (수량이 없을경우, 삭제버튼이 있을경우)
const deletCartDao = async (userId, productId) => {
  const deletCart = await AppDataSource.query(
    `DELETE FROM carts WHERE user_id = ? AND product_id = ?;`,
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
};
