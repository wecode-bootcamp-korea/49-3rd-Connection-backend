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
      seller_id: item.seller_id,
      products,
    });
  });
  return finalCart;
};

const speedCheckService = async (userId, productId) => {
  return await cartDao.easyCheckDao(userId, productId);
};

// 장바구니 생성
const updateCartService = async (userId, productId, quantity) => {
  const existingCartItem = await cartDao.easyCheckDao(userId, productId);
  if (existingCartItem[0] == null) {
    const addCart = await cartDao.makeCartDao(userId, productId, quantity);
    return addCart;
  }
  if (existingCartItem[0].quantity !== 0) {
    const updateCart = await cartDao.updateQuantityDao(
      userId,
      productId,
      quantity
    );
    return updateCart;
  }
};

const UpdateQuantityService = async (userId, prodcutId, quantity) => {
  const updateQuantity = await cartDao.updateQuantityDao(
    userId,
    productId,
    quantity
  );
  return updateQuantity;
};

//장바구니 삭제
// const removeCartService = async (userId,cartId) => {
//   const checkProductExistence = cartDao.easyCheckDao(cartId)
//   if (checkProductExistence.quantity > 0){
//     await UpdatequantityService
//   } else {await cartDao.deletCartDao(cartId)}
// };

module.exports = {
  getCartService,
  speedCheckService,
  updateCartService,
  UpdateQuantityService,
  // removeCartService,
};
