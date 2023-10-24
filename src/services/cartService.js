const { cartDao } = require('../models');

// 장바구니 조회

const getCartService = async (userId) => {
  const cartInformation = await cartDao.getCartDao(userId);
  if (cartInformation[0] == null) {
    return console.log('NOTHING');
  } else {
    return cartInformation;
  }
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

const fixedQuantityService = async (userId, productId, quantity) => {
  return await cartDao.updateQuantityDao(userId, productId, quantity);
};

// 주문단계 전 장바구니 업데이트
const UpdateQuantityService = async (userId, productId, quantity) => {
  const existingCartItem = await cartDao.easyCheckDao(userId, productId);
  if (existingCartItem[0] == null) {
    return console.log('error', error);
  }
  if (existingCartItem[0].quantity !== 0) {
    const updateQuantityResult = await cartDao.updateQuantityDao(
      userId,
      productId,
      quantity
    );
    const updateStatusResult = await cartDao.updateStatusDao(userId, productId);
    await Promise.all([updateQuantityResult, updateStatusResult]);
  }
};
// 주문 단계로 들어간 장바구니 조회

const getOrderItemService = async (userId) => {
  const getOrderItem = await cartDao.getOrderItemDao(userId);
  if (getOrderItem[0] == null) {
    return console.log('error', error);
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
    const deletCartResult = await cartDao.deletCartDao(userId, productId);
    await Promise.all([deletCartResult]);
  } else {
    return console.log('error', error);
  }
};

const rollbackService = async (userId) => {
  return await returnCartDao(userId);
};

module.exports = {
  getCartService,
  speedCheckService,
  updateCartService,
  UpdateQuantityService,
  fixedQuantityService,
  getOrderItemService,
  removeCartService,
  getUserInfoService,
  rollbackService,
};
