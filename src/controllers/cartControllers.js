const { throwError } = require('../utils/throwError');
const { cartService } = require('../services');

// 장바구니 조회
const getCartController = async (req, res, next) => {
  try {
    const userId = 3;
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

// 제품 상세페이지 장바구니 담기 (완료)
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

// 주문단계 진입전 장바구니 업데이트
const UpdateOrderController = async (req, res, next) => {
  try {
    const userId = 1;
    const ArrayOfObjects = req.body.data;
    await Promise.all(
      ArrayOfObjects.map(async (item) => {
        const { productId, quantity } = item;
        item.userId = userId;
        await cartService.UpdateQuantityService(userId, productId, quantity);
        if (!userId) {
          throwError(400, 'Connection Error');
        }
        if (!productId) {
          throwError(400, 'CANNOT_SEARCH_Product');
        }
        if (!quantity) {
          throwError(400, 'CANNOT_SEARCH_Quantity');
        }
      })
    );
    const orderlist = await Promise.all(
      ArrayOfObjects.map(async (item) => {
        const { productId, quantity } = item;
        item.userId = userId;
        return cartService.speedCheckService(userId, productId); // await 추가
      })
    );
    console.log('orderList:', orderlist);
    return res.status(200).json({
      message: 'Update Success!',
      data: orderlist,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

// 장바구니 삭제
const removeCarcontroller = async (req, res, next) => {
  try {
    const userId = 1;
    const { productId } = req.body;
    await cartService.removeCartService(userId, productId);
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
  UpdateOrderController,
  removeCarcontroller,
};
