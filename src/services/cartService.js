const { cartDao } = require('../models');
const {
  getCartDao,
  easyCheckDao,
  creatCartDao
  newProductDao,
  updateQuantityDao,
  deletCartDao,
} = cartDao;

// 장바구니 조회

const getCartService = async (userId) => {
  const cartItems = await getCartDao(userId);
  return cartItems
};

// (users.id, users.name, carts.id, products.seller_id,
//products.id, products.name, carts.quantity,
//products.price, products.discount_rate)

const speedCheckService = async (userId) => {
  return await easyCheckDao(userId);
};

// 장바구니가 없을 경우, 생성

const makeCartService = async (userId, productId, quantity) => {
  const isCart = await creatCartDao(userId, productId, quantity);
};

// 장바구니 품목 추가 변경

const addItemService = async (userId, productId, quantity) => {
  const checkCartProduct = await easyCheckDao(userId);
  return await updateCartDao(productId, quantity, cartId);
};

// 장바구니 제품수량 변경
const quantityUpdateService = async (userId, productId, quantity) => {
  const checkCart = await easyCheckDao(userId);
  return await updateQuantityDao(quantity, cartId, productId);
};

// 장바구니 삭제
const removeCartService = async (userId) => {
  const noItemCart = await easyCheckDao(userId);
  return await deletCartDao(userId, cartId);
};

module.exports = {
  getCartService,
  speedCheckService,
  makeCartService,
  addItemService,
  quantityUpdateServiceremoveCartService,
};
