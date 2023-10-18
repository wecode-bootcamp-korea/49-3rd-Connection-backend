const { throwError } = require('../utils/throwError');
const { cartService } = require('../services');

// 장바구니 조회
const getCartController = async (req, res, next) => {
  try {
    const userId = 1;
    const cartInformation = await cartService.getCartService(userId);
    if (!userId) {
      throwError(400, 'Connection Error');
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
const addNewProductController = async (req, res, next) => {
  try {
    const userId = 1;
    const { productId, quantity } = req.body;
    await cartService.updateCartService(userId, productId, quantity);
    if (!userId) {
      throwError(400, 'Connection Error');
    }
    if (!productId) {
      throwError(400, 'CANNOT_SEARCH_Product');
    }
    if (!quantity) {
      throwError(400, 'CANNOT_SEARCH_Quantity');
    }
    return res.status(200).json({
      message: 'Update Success!',
      data: await cartService.speedCheckService(userId, productId),
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

// 장바구니 업데이트
const UpdatequantityController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { prodcutId, quantity } = req.body;
    if (!userId) {
      throwError(400, 'Connection Error');
    }
    if (!productId) {
      throwError(400, 'CANNOT_SEARCH_Product');
    }
    if (!quantity) {
      throwError(400, 'CANNOT_SEARCH_Quantity');
    }
    return res.status(200).json({
      message: 'Update Success!',
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

const removeCarcontroller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { prodcutId } = req.body;
    if (!userId) {
      throwError(400, 'Connection Error');
    }
    if (!productId) {
      throwError(400, 'CANNOT_SEARCH_Product');
    }
    return res.status(200).json({
      message: 'Delete Success!',
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};
module.exports = {
  getCartController,
  addNewProductController,
  UpdatequantityController,
  // removeCarcontroller,
};
