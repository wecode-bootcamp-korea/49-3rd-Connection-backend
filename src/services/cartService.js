const { cartDao } = require('../models');

// 장바구니 조회

const getCartService = async (userId) => {
  const cartInformation = await cartDao.getCartDao(userId);
  const finalCart = [];
  cartInformation.forEach((item) => {
    const products = item.products.map((product) => ({
      ...product,
      totalPrice:
        product.originalPrice *
        (1 - product.discountRate / 100) *
        product.quantity,
      discountedAmount:
        product.originalPrice * (product.discountRate / 100) * product.quantity,
    }));

    finalCart.push({
      sellerId: item.seller_id,
      sellerName: item.sellerName,
      sellerImage: item.sellerImage,
      productImage: item.products.images,
      products,
    });
  });
  return finalCart;
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
  removeCartService,
};
