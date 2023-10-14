const { throwError } = require('../../utils/throwError.js');
const { cartService } = require('../services');
const {
  getCartService,
  speedCheckService,
  makeCartService,
  addItemService,
  quantityUpdateService,
  removeCartService
} = cartService;

// 장바구니 조회
const getCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartInformation = await getCartService(userId);
    if (!userId) {
      throwError(400, 'KEY_ERROR');
    }
    if (!cartInformation) {
      throwError(400, 'CANNOT_SEARCH_CART');
    }
    return res.status(200).json({
      message: 'Cart_Information',
      userId: cartInformation[0].users.id,
      userName: cartInformation[0].users.name
      cartId: cartInformation[0].carts.id
      products : [{
        sellerId : cartInformation[0].products.seller_id
        product : [{
          productId : cartInformation[0].products.id
          productName : cartInformation[0].products.name
          quantity : cartInformation[0].carts.quantity
          productPrice : cartInformation[0].products.price
          discountRate : cartInformation[0].products.discount_rate
        }]
      }]
    });
  } catch (error) {
    console.log(err);
    next(err);
  }
};
// 장바구니 새로 생성
const creatCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;
  } catch (error) {}
};

// 장바구니 업데이트
const updateCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;
  } catch (error) {}
};

const removeCarcontroller = async (req, res, next) => {
  try {
    const userId = req.user.id;
  } catch (error) {}
}

module.exports = {
  getCartController,
  creatCartController,
  updateCartController,
  removeCarcontroller
}