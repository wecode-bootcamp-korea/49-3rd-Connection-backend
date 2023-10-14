const { DataSource } = require('./dataSource');

// 장바구니 조회

const getCartDao = async (userId) => {
  const checkCart = await DataSource.query(
    `SELECT users.id,
     users.name,
     carts.id,
     products.seller_id,
     products.id,
     products.name,
     carts.quantity,
     products.price,
     products.discount_rate
     FROM users 
     RIGHT JOIN carts ON users.id=carts.user_id 
     INNER JOIN products on carts.product_id = products.id 
     WHERE users.id = ?;`,
    [userId]
  );
  return checkCart;
};

// 장바구니 간편조회 
const easyCheckDao = async (userId) =>{
  const checkEasy = await DataSource.query(
    `SELECT * FROM carts WHERE user_id = ?`
    [userId]
  )
}

// 장바구니 생성 (장바구니가 없을 경우)

const creatCartDao = async (userId, productId, quantity) => {
  const newCart = await DataSource.query(
    `INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?);`,
    [userId, productId, quantity]
  );
  return newCart;
};

// 장바구니 품목 추가 변경
const newProductDao = async (productId, quantity, cartId) => {
  const updateNewProduct = await DataSource.query(
    `INSERT INTO carts (product_id, quantity) VALUES (?, ?) where cartId = ?;`,
    [productId, quantity, cartId]
  );
  return updateNewProduct;
};

//장바구니 수량 변경
cosnt updateQuantityDao = async (quantity, cartId, productId) =>{
  const updateQuantity = await DataSource.query(
    `UPDATE carts SET quantity =? WHERE cartId=? and productId=?;`,
  [quantity,cartId,productId]
  );
  return updateQuantity
}


// 장바구니 삭제 (제품이 없을경우)
const deletCartDao = async (userId, cartId) => {
  const deletCart = await DataSource.query(
    `DELETE FROM carts WHERE cartId = ?;`,
    [cartId]
  );
  return deletCart;
};

module.exports = {
  getCartDao,
  easyCheckDao,
  creatCartDao,
  newProductDao,
  updateQuantityDao,
  deletCartDao,
};
