const { orderDao } = require('../models');
const createOrders = async (
  // 받아오는 data
  userId,
  totalPrice,
  shippingMethod,
  paymentId,
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

  const orderId = newOrder; // orderDetails 에서 저장하기 위한 orderId 가져오기
  console.log(orderId);


  if( )    // orderDetails 로 들어가는 게 실패했는데, order 테이블에 계속 추가되는 경우 
  // 2) orderDetails table 주문 정보 저장
  const newOrderDetails = await orderDao.newOrderDetails(
    orderId,
    productId,
    quantity
  );

  const cartQuantity = await orderDao.cartQuantity(userId, productId); // await: userId, productId,(orderDetails의 ) quantity를  orderDao로 보내준다
  console.log(cartQuantity);

  if () // 장바구니에 있는 cart < 주문 들어온 수량 클 때  (quantity 들어오고 나서, 에러 내보내야 함 )

  const updateQuantity = cartQuantity - quantity;
  // 3) carts 에서 삭제:  carts 의 quantity 와 orderDetails의 quantity가 같으면( if(cart에서 불러오는 Quantity == quantity)): 전체삭제, 같지 않다면(else): 부분 삭제
  if (cartQuantity == quantity) {
    const deleteAllCarts = await orderDao.deleteAllCarts(
      userId,
      productId,
      quantity
    ); // 위에서 받아온 cartQuantity, orderdetails에서 받은 quantity
  } else {
    const updateCarts = await orderDao.updateCarts(
      userId,
      productId,
      updateQuantity
    );
  } // orderDetails 의 quantity에서 내려오는 값, cartQauntity를 따로 가져오는 쿼리문 연결
};
module.exports = { createOrders };
