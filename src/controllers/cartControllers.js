const { throwError } = require('../utils/throwError');
const { cartService } = require('../services');
const { getCartService } = cartService;
// speedCheckService,
// makeCartService,
// addItemService,
// quantityUpdateService,
// removeCartService,

// 장바구니 조회
const getCartController = async (req, res, next) => {
  try {
    const userId = 3;
    const cartInformation = await getCartService(userId);
    if (!userId) {
      throwError(400, 'KEY_ERROR');
    }
    if (!cartInformation) {
      throwError(400, 'CANNOT_SEARCH_CART');
    }
    return res.status(200).json({
      message: 'Cart_Information',
      data: cartInformation,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
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
};

module.exports = {
  getCartController,
  // creatCartController,
  // updateCartController,
  // removeCarcontroller,
};
