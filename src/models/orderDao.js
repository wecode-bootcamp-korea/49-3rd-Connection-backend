const { AppDataSource } = require('./dataSource.js');

// 1) orders table 주문 정보 저장
const createOrders = async (
  userId,
  orderId,
  totalPrice,
  shippingMethod,
  paymentId
) => {
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
const neworderDetails = async (orderId, productId, quantity) => {
  await AppDataSource.query(`
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
      `);
}; // await 앞에 굳이 const로 함수명 정의해주지 않아도 됨. return할 때 필요한 건데, return 안하니
// 함수명 회색이여도 괜찮음. 여기에서는 return을 해줄 필요 없음 -> 주문 정보 req에서 받아와서 저장이니, res에 보내줄 값이 없기에. (getPost일 땐 return 하겠지만)

// 3) carts 에서 전체 삭제
const deleteAllCarts = async (userId, productId, quantity) => {
  await AppDataSource.query(`
    DELETE FROM carts WHERE user_id = ${userId} AND product_id = ${productId} AND quantity = ${quantity}
    `); // return 필요없음 (res 보내줄 값이 없음 )
};

// 4) carts 에서 부분 삭제
const updateCarts = async (userId, productId, quantity) => {
  await AppDataSource.query(`
    UPDATE carts SET quantity= ${quantitiy}  WHERE user_id = ${userId} AND product_id = ${productId} 
    `); // return 필요없음 (res 보내줄 값이 없음 )
}; //장바구니 테이블 : 수량 변경만 하면 됨

module.exports = {
  createOrders,
  neworderDetails,
  deleteAllCarts,
  updateCarts,
};
