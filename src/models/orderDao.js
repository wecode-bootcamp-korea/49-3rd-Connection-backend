const { AppDataSource } = require('./dataSource');

const isUsersPoints = async (userId) => {
  const usersPoints = await AppDataSource.query(`
  SELECT points FROM users WHERE id = ${userId}; 
  `);

  return usersPoints[0].points;
};

const isProductInCarts = async (userId, productId) => {
  const cartsProductId = await AppDataSource.query(`
  SELECT product_id FROM carts WHERE user_id = ${userId} AND product_id = ${productId}
  `);
  if (cartsProductId.length > 0) {
    return cartsProductId[0].product_id;
  } else {
    return null;
  }
};

const createOrders = async (userId, totalPrice, shippingMethod, paymentId) => {
  const newOrder = await AppDataSource.query(`
    INSERT INTO 
      orders(
        user_id, 
        total_price, 
        shipping_method, 
        payment_id
        ) 
    VALUES (
      '${userId}', 
      '${totalPrice}', 
      '${shippingMethod}', 
      '${paymentId}'
    ) 
    `);
  return newOrder.insertId;
};

const userPoints = async (userId) => {
  const pointsFromUser = await AppDataSource.query(`
  SELECT points FROM users WHERE id = ${userId} 
  `);

  return pointsFromUser[0].points;
};

const updatePoints = async (userId, updatePoints) => {
  await AppDataSource.query(`
    UPDATE users SET  points = '${updatePoints}'  WHERE id = ${userId} 
  `);
};

const newOrderDetails = async (orderId, productId, quantity) => {
  await AppDataSource.query(`
    INSERT INTO 
      order_details(
        order_id,
        product_id, 
        quantity
      ) 
    VALUES (
      "${orderId}", 
      "${productId}", 
      "${quantity}" 
    ) 
  `);
};

const cartQuantity = async (userId, productId) => {
  const result = await AppDataSource.query(`
  SELECT quantity FROM carts WHERE user_id = ${userId} AND product_id = ${productId}
  `);
  if (result.length > 0) {
    return result[0].quantity;
  } else {
    return 0;
  }
};

const deleteAllCarts = async (userId, productId) => {
  await AppDataSource.query(`
    DELETE FROM carts WHERE user_id = ${userId} AND product_id = ${productId} 
    `);
};

const updateCarts = async (userId, productId, updateQuantity) => {
  await AppDataSource.query(`
    UPDATE carts SET  quantity = '${updateQuantity}'  WHERE user_id = ${userId} AND product_id = ${productId} 
    `);
};

// ----------------------바로구매용----------------------------------------

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
  isUsersPoints,
  isProductInCarts,
  createOrders,
  newOrderDetails,
  userPoints,
  updatePoints,
  cartQuantity,
  deleteAllCarts,
  updateCarts,
  checkUserPoints,
  modifyPoint,
  createOrder,
  createOrderDetail,
  checkCartQuantity,
  deleteCart,
  modifyCart,
};
