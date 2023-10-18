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
  // 1) orders table 주문 정보 저장
  const newOrder = await orderDao.createOrders(
    userId,
    totalPrice,
    shippingMethod,
    paymentId
  ); // 주문정보 저장은 return해줄 필요 없음

  // orderDetails 에서 저장하기 위한 orderId 가져오기
  const orderId = newOrder;

  // 2) orderDetails table 주문 정보 저장
  const newOrderDetails = await orderDao.createOrderDetails(
    userId,
    orderId,
    productId,
    quantity
  );
  return newOrderDetails;

  // 3) carts 에서 삭제
  const deletingCarts = await orderDao.deleteCartsProducts(
    userId,
    productId,
    quantity
  );
  return deletingCarts;
};

module.exports = {
  createOrders,
};
