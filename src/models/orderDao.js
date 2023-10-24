const { AppDataSource } = require('./dataSource');

const checkUserPoints = async (userId) => {
  point = await AppDataSource.query(
    `SELECT points FROM users WHERE id= ${userId}`
  );
  return point[0].points;
};

const modifyPoint = async (totalPrice, userId) => {
  await AppDataSource.query(`
  UPDATE users SET points= points - ${totalPrice} WHERE id = ${userId}`);
};

const createOrder = async (userId, totalPrice, shippingMethod, paymentId) => {
  const createOrder = await AppDataSource.query(`INSERT INTO orders 
  (total_price, shipping_method, user_id, payment_id) 
  VALUES (${totalPrice}, '${shippingMethod}', ${userId}, ${paymentId})`);

  return createOrder.insertId;
};

const createOrderDetail = async (orderId, productId, quantity) => {
  await AppDataSource.query(`INSERT INTO order_details 
  (quantity, product_id, order_id) 
  VALUES (${quantity}, ${productId}, ${orderId})`);
};

const checkCartQuantity = async (userId, productId) => {
  const result = await AppDataSource.query(
    `
  SELECT quantity FROM carts WHERE user_id = ${userId} AND product_id = ${productId};
`
  );
  return result;
};

const deleteCart = async (userId, productId) => {
  await AppDataSource.query(
    `
        DELETE FROM carts WHERE user_id = ${userId} AND product_id = ${productId};
      `
  );
};

const modifyCart = async (quantity, userId, productId) => {
  await AppDataSource.query(
    `
      UPDATE carts SET quantity= quantity - ${quantity} WHERE user_id = ${userId} AND product_id = ${productId} 
    `
  );
};

module.exports = {
  checkUserPoints,
  modifyPoint,
  createOrder,
  createOrderDetail,
  checkCartQuantity,
  deleteCart,
  modifyCart,
};
