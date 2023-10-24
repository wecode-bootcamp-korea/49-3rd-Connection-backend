const { orderDao } = require('../models');
const { throwError } = require('../utils/throwError');

const createOrders = async (
  // 받아오는 data
  userId,
  totalPrice,
  shippingMethod,
  paymentId,
  products
) => {
  // user points
  const isUsersPoints = await orderDao.isUsersPoints(userId);
  console.log(isUsersPoints);

  // 에러 핸들링: order.totalPrice > user : 포인트가 부족할 때  ( 갖고 있는 point보다 비싼 걸 살 때)
  if (totalPrice > isUsersPoints) throwError(400, 'not enough points');

  // 1) orders table 주문 정보 저장 (orderDao에서. 그러니까 dao로 넘겨주는)

  const newOrder = await orderDao.createOrders(
    userId,
    totalPrice,
    shippingMethod,
    paymentId
  ); // 주문정보 저장은 return해줄 필요 없음

  const orderId = newOrder; // orderDetails 에서 저장하기 위한 orderId 가져오기
  console.log(orderId);

  // 2) 결제 users 의 points 부분 차감 : users 의 points 와 orderDetails의 totalPrice 가 다른 경우에, UPDATE 수정을 위한 계산식
  const remainPoints = isUsersPoints - totalPrice;
  // 2) 결제 : users 의 points 와 orderDetails의 totalPrice 와 같아도, 적어도 -> 수정으로 통일
  const updatePoints = await orderDao.updatePoints(userId, remainPoints); //차감한 points(=remainPoints)을 Dao로 보내서, update한다
  // totalPrice = 2000, isUsersPoints= 5000 -> update 그냥하면 updatePoints= 2000이 됨 (isUsersPoints - totalPrice 해야 함 )

  // 장바구니-> 구매 : 장바구니에 여러 products 담을 때
  const orderDetailsPromises = [];
  const cartUpdatePromises = [];

  for (let i = 0; i < products.length; i++) {
    // 배열의 각 productId, quantity 뽑아오기
    const productId = products[i].productId;
    const quantity = products[i].quantity;

    // 에러 핸들링: carts 에 담기지 않은 product를 주문할 때 -> productId 라서 for()안에 들어가야 함
    const isProductInCarts = await orderDao.isProductInCarts(userId, productId); // await: userId, productId,(orderDetails의 ) quantity를  orderDao로 보내준다
    console.log(isProductInCarts);

    if (productId !== isProductInCarts)
      throwError(400, 'ordered productId is not in the carts');

    // cart quantity
    const cartQuantity = await orderDao.cartQuantity(userId, productId); // await: userId, productId,(orderDetails의 ) quantity를  orderDao로 보내준다
    const updateQuantity = cartQuantity - quantity; //4)carts 에서 부분삭제:  carts 의 quantity 와 orderDetails의 quantity가 다른 경우에, UPDATE 수정 위한 계산

    // 에러 핸들링 : carts에 담은 수량  < 주문한 수량__  장바구니 < order 수량 많은 경우 없음_ 장바구니에서 저장 후 넘어가니
    if (cartQuantity < quantity)
      throwError(400, 'ordered more products than cartsQuantity');

    // 3) orderDetails table 주문 정보 저장
    const newOrderDetails = orderDao.newOrderDetails(
      orderId,
      productId,
      quantity
    );
    orderDetailsPromises.push(newOrderDetails);

    // 4) carts 에서 삭제:  carts 의 quantity 와 orderDetails의 quantity가 같으면( if(cart에서 불러오는 Quantity == quantity)): 전체삭제, 같지 않다면(else): 부분 삭제

    if (cartQuantity == quantity) {
      const deleteAllCarts = await orderDao.deleteAllCarts(
        userId,
        productId,
        quantity
      ); // 위에서 받아온 cartQuantity, orderdetails에서 받은 quantity
      cartUpdatePromises.push(deleteAllCarts);
    } else {
      const updateCarts = await orderDao.updateCarts(
        userId,
        productId,
        updateQuantity
      ); //차감한 수량을 Dao로 보내서, update한다,  // orderDetails 의 quantity에서 내려오는 값, cartQauntity를 따로 가져오는 쿼리문 연결
      cartUpdatePromises.push(updateCarts);
    }
  }
  await Promise.all(orderDetailsPromises);
  await Promise.all(cartUpdatePromises);
};

module.exports = { createOrders };
