const { AppDataSource } = require('./dataSource.js');

const createOrders = async (
  userId,
  totalPrice,
  shippingMethod,
  paymentId,
  orderId,
  productId,
  quantity
) => {
  // 1) orders table 주문 정보 저장
  const newOrder = await AppDataSource.query(`
    INSERT INTO 
      orders(
        userID, 
        orderID,
        total_price, 
        shipping_method, 
        payment_id
        ) 
    VALUES (
      '${userId}', 
      '${orderId}', 
      '${totalPrice}', 
      '${shippingMethod}', 
      '${paymentId}'
    ) 
    `);

  console.log(newOrder);

  const orderId = newOrder.insertId; // 위에서 저장한 newOrder에서 insertId로 자동으로 order.id만 뽑아내는 코드
  return orderId; //뽑아낸 order.id를 orderService.js로 보내주기
};

// 2) orderDetails table 주문 정보 저장
const neworderDetails = await AppDataSource.query(`
    INSERT INTO 
      order_details(
        order_id,
        product_id, 
        quantity
        ) 
    VALUES (
      "${orderId} ", 
      "${productId}", 
      "${quantity}" 
      ) 
      `); // 함수명 회색이여도 괜찮음. 여기에서는 return을 해줄 필요 없음 -> 주문 정보 req에서 받아와서 저장이니, res에 보내줄 값이 없기에. (getPost일 땐 return 하겠지만)

// 3) carts 에서 삭제
const deletingCarts = await AppDataSource.query(`
    DELETE FROM carts WHERE user_id = ${userId} AND product_id = ${productId} AND quantity = ${quantity}
    `); // return 필요없음 (res 보내줄 값이 없음 )

module.exports = {
  createOrders,
};
