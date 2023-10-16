const { AppDataSource } = require('./dataSource');

// 장바구니 조회

const getCartDao = async (userId) => {
  const checkCart = await AppDataSource.query(
    `SELECT users.id AS user_id,
     users.name AS user_name,
     products.seller_id,
     products.id AS product_id,
     products.name AS product_name,
     carts.quantity,
     products.price,
     products.discount_rate
     FROM users 
     INNER JOIN carts ON users.id=carts.user_id 
     INNER JOIN products ON carts.product_id = products.id 
     WHERE users.id = ?;`,
    [userId]
  );

  return checkCart;
};

// 장바구니 간편조회
const easyCheckDao = async (userId) => {
  const checkEasy = await DataSource.query(
    `SELECT * FROM carts WHERE user_id = ?`,
    [userId]
  );
  return checkEasy;
};

// // 장바구니 생성
// cosnt makeCartDao = async (userId, productId, quantity) =>{
//   const creatCart = await DataSource.query(
//     ` INSERT INTO carts (userId, prodcutId, quantity) VALUES (?,?,?)`,
//   [userId, productId, quantity]
//   );
//   return creatCart
// }

//장바구니 수량 변경
// cosnt updateQuantityDao = async (quantity, cartId, productId) =>{
//   const updateQuantity = await DataSource.query(
//     `UPDATE carts SET quantity =? WHERE cartId=? and productId=?;`,
//   [quantity,cartId,productId]
//   );
//   return updateQuantity
// }

// 장바구니 삭제 (수량이 없을경우)
// const deletCartDao = async (userId, cartId) => {
//   const deletCart = await DataSource.query(
//     `DELETE FROM carts WHERE cartId = ?;`,
//     [cartId]
//   );
//   return deletCart;
// };

module.exports = {
  getCartDao,
  easyCheckDao,
  // makeCartDao,
  // updateQuantityDao,
  // deletCartDao,
};
