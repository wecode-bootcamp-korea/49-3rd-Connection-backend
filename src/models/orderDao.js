const { AppDataSource } = require('./dataSource');

// 에러 핸들링: user 포인트가 부족할 때 ( 갖고 있는 point보다 비싼 걸 살 때)
const isUsersPoints = async (userId) => {
  const usersPoints = await AppDataSource.query(`
  SELECT points FROM users WHERE id = ${userId}; 
  `);

  return usersPoints[0].points;
};

// 에러 핸들링 : carts 에 없는 product id 주문 시, 에러 핸들링 위한 carts의 product id 가져오기
const isProductInCarts = async (userId, productId) => {
  const cartsProductId = await AppDataSource.query(`
  SELECT product_id FROM carts WHERE user_id = ${userId} AND product_id = ${productId}
  `);
  if (cartsProductId.length > 0) {
    return cartsProductId[0].product_id;
  } else {
    return null;
  } // 장바구니에 해당 제품이 없는 경우에 대한 처리
};

// 1) orders table 주문 정보 저장
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

// 2) 결제: 포인트 차감을 위한 user points 가져오기
const userPoints = async (userId) => {
  const pointsFromUser = await AppDataSource.query(`
  SELECT points FROM users WHERE id = ${userId} 
  `);

  return pointsFromUser[0].points;
}; // quantity는 'select 문을 위해' 받아올 필요 없음 , select문으로 구할 값!
// console.log('카트에 들어있는 수량 :', cartQuantity);

// 2) 결제:  points 전체 or 부분 차감 (delete 없이)
const updatePoints = async (userId, updatePoints) => {
  await AppDataSource.query(`
    UPDATE users SET  points = '${updatePoints}'  WHERE id = ${userId} 
    `); // return 필요없음 (res 보내줄 값이 없음 )
}; //장바구니 테이블 : 수량 변경만 하면 됨

// 3) orderDetails table 주문 정보 저장
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
}; // await 앞에 굳이 const로 함수명 정의해주지 않아도 됨. return할 때 필요한 건데, return 안하니
// 함수명 회색이여도 괜찮음. 여기에서는 return을 해줄 필요 없음 -> 주문 정보 req에서 받아와서 저장이니, res에 보내줄 값이 없기에. (getPost일 땐 return 하겠지만)

// 4) 장바구니 삭제를 위한 수량 가져오기
const cartQuantity = async (userId, productId) => {
  const result = await AppDataSource.query(`
  SELECT quantity FROM carts WHERE user_id = ${userId} AND product_id = ${productId}
  `);
  if (result.length > 0) {
    return result[0].quantity;
  } else {
    return 0; // 또는 다른 기본값을 반환할 수 있습니다.
  }
};
// quantity는 'select 문을 위해' 받아올 필요 없음 , select문으로 구할 값!
// console.log('카트에 들어있는 수량 :', cartQuantity);

// 4)-1 carts 에서 전체 삭제
const deleteAllCarts = async (userId, productId) => {
  await AppDataSource.query(`
    DELETE FROM carts WHERE user_id = ${userId} AND product_id = ${productId} 
    `); // return 필요없음 (res 보내줄 값이 없음 )
};

// 4)-2 carts 에서 부분 삭제
const updateCarts = async (userId, productId, updateQuantity) => {
  await AppDataSource.query(`
    UPDATE carts SET  quantity = '${updateQuantity}'  WHERE user_id = ${userId} AND product_id = ${productId} 
    `); // return 필요없음 (res 보내줄 값이 없음 )
}; //장바구니 테이블 : 수량 변경만 하면 됨

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
