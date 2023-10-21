const { cartDao } = require('../models');

// 장바구니 조회

const getCartService = async (userId) => {
  const cartInformation = await cartDao.getCartDao(userId);

  return cartInformation;
};

const speedCheckService = async (userId, productId) => {
  const speedCheck = await cartDao.easyCheckDao(userId, productId);
  return speedCheck[0];
};

// 장바구니 생성 or 수량 늘리기
const updateCartService = async (userId, productId, quantity) => {
  const existingCartItem = await cartDao.easyCheckDao(userId, productId);
  if (existingCartItem[0] == null) {
    return await cartDao.makeCartDao(userId, productId, quantity);
  }
  if (existingCartItem[0].quantity !== 0) {
    const addedQuantity = Number(existingCartItem[0].quantity + quantity);
    return await cartDao.updateQuantityDao(userId, productId, addedQuantity);
  }
};

// 주문단계 전 장바구니 업데이트
const UpdateQuantityService = async (userId, productId, quantity) => {
  const existingCartItem = await cartDao.easyCheckDao(userId, productId);
  if (existingCartItem[0].quantity !== 0) {
    const updateQuantityResult = await cartDao.updateQuantityDao(
      userId,
      productId,
      quantity
    );
    const updateStatusResult = await cartDao.updateStatusDao(userId, productId);
    await Promise.all([updateQuantityResult, updateStatusResult]);
  } else {
    return throwError;
  }
};
// 주문 단계로 들어간 장바구니 조회

const getOrderItemService = async (userId) => {
  const getOrderItem = await cartDao.getOrderItemDao(userId);
  console.log(';;;;', getOrderItem[0]);
  if (getOrderItem[0] == null) {
    return throwError;
  } else {
    return getOrderItem;
  }
};
// 유저 정보 불러오기
const getUserInfoService = async (userId) => {
  const getUserInfo = await cartDao.getUserInfoDao(userId);
  return getUserInfo;
};

//장바구니 삭제
const removeCartService = async (userId, productId) => {
  const checkCartExistence = cartDao.easyCheckDao(userId, productId);
  if (checkCartExistence[0] !== null) {
    return await cartDao.deletCartDao(userId, productId);
  } else {
    throwError;
  }
};

module.exports = {
  getCartService,
  speedCheckService,
  updateCartService,
  UpdateQuantityService,
  getOrderItemService,
  removeCartService,
  getUserInfoService,
};
