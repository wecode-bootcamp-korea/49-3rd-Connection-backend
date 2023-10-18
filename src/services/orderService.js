const { orderDao } = require('../models');

// 받아오는 data
const createOrders = async (
  userId,
  totalPrice,
  shippingMethod,
  paymentId,
  orderId,
  productId,
  quantity
) => {

  if (!productId) {
    throwError(400, 'no product');
  }

  // 1) orders table 주문 정보 저장
  const newOrder = await orderDao.createOrders(
    userId,
    totalPrice,
    shippingMethod,
    paymentId
  ); // 주문정보 저장은 return해줄 필요 없음

  const orderId = newOrder;      // orderDetails 에서 저장하기 위한 orderId 가져오기

  // 2) orderDetails table 주문 정보 저장
//   const newOrderDetails = await orderDao.createOrders(
  await orderDao.createOrderDetails(
    userId,
    orderId,
    productId,
    quantity
  )


  // 3) carts 에서 삭제
  // carts 의 quantity 와 orderDetails의 quantity가 같으면(  if(cart에서 불러오는 Quantity == quantity)), 전체삭제 
  // 같지 않다면(else), 부분 삭제 
  if(cartQuantity == quantity)
  else 
  
  const deletingCarts = await orderDao.deleteCartsProducts(
    userId,
    productId,
    quantity
  );

};

module.exports = {
  createOrders,
};
