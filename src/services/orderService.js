const { orderDao } = require('../models');
const createOrders = async (
  // 받아오는 data
  userId,
  totalPrice,
  shippingMethod,
  paymentId,
  productId,
  quantity,

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

  // 에러 핸들링: order.totalPrice > user : 포인트가 부족할 때  ( 갖고 있는 point보다 비싼 걸 살 때) 
  if( totalPrice > isUsersPoints ){
    throw new Error('user 포인트 부족; 가진 포인트보다 비싼 거 사려고 함')
  } 
  
  // 에러 핸들링: cart 에 없는 걸 주문할 뗴 -> productId 
  if( productId !== isProductInCarts){
    throw new Error('장바구니에 없는 product id를 주문함')
  } 
  // 에러 핸들링  transaction 1 : orderDetails 로 insert into 실패했는데, order 테이블에 계속 추가되는 경우
  if(  ){
    throw new Error('2단계 orderDetails 주문정보 저장 실패, 처음으로 롤백! ')
  } 

  // 2) orderDetails table 주문 정보 저장
  const newOrderDetails = await orderDao.newOrderDetails(
    orderId,
    productId,
    quantity
  );

  const cartQuantity = await orderDao.cartQuantity(userId, productId); // await: userId, productId,(orderDetails의 ) quantity를  orderDao로 보내준다
  console.log(cartQuantity);

  // 에러 핸들링 : cart에 담은 수량  < 주문한 수량 (quantity니까 orderDetails에 주문 저장 후, 에러 내보내야 함 )
  if( cartQuantity < quantity  ){
    throw new Error('장바구니에 담은 수량보다, 더 많이 주문함 ')
  } 


  // 에러 핸들링  transaction 2 : 결제 단계로 실패했는데, (결제 후 단계) orderdetails 테이블에 계속 추가되는 경우
  if(  ){
    throw new Error('3단계 결제 실패, 처음으로 롤백! ')
  } 

  // 3) 결제 users 의 points 부분 차감 : users 의 points 와 orderDetails의 totalPrice 가 다른 경우에, UPDATE 수정을 위한 계산식 
  const updatePoints = userPoints - totalPrice
  //3) 결제 : users 의 points 와 orderDetails의 totalPrice 가 같으면: 전체삭제, 같지 않다면(else): 부분 삭제
    if (userPoints == totalPrice) {
      const deleteAllPoints = await orderDao.deleteAllCarts(
        userId,
        productId,
        quantity
      ); // 위에서 받아온 cartQuantity, orderdetails에서 받은 quantity
    } else {
      const updatedPoints = await orderDao.updateCarts(
        userId,
        productId,
        updateQuantity
      );
    } 
  
  // 4) carts 에서 부분삭제:  carts 의 quantity 와 orderDetails의 quantity가 다른 경우에, UPDATE 수정 위한 계산식
  const updateQuantity = cartQuantity - quantity;
  // 4) carts 에서 삭제:  carts 의 quantity 와 orderDetails의 quantity가 같으면( if(cart에서 불러오는 Quantity == quantity)): 전체삭제, 같지 않다면(else): 부분 삭제
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