const { throwError } = require('../utils/throwError');
const { cartService } = require('../services');

// 장바구니 조회
const getCartController = async (req, res, next) => {
  try {
    const userId = req.userId;
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

// 제품 상세페이지 장바구니 담기
const addNewProductController = async (req, res, next) => {
  try {
    const userId = req.userId;
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
//주문단계 진입전 장바구니 수량 업데이트
const updateQuantityController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body.data;

    await cartService.fixedQuantityService(userId, productId, quantity);
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
const updateOrderController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const ArrayOfObjects = req.body.data;
    console.log(ArrayOfObjects);
    let orderlist = [];
    if (ArrayOfObjects.length === 0) {
      throwError(202, 'No products have been selected. ');
    }
    if (ArrayOfObjects.length === 1) {
      const { productId, quantity } = ArrayOfObjects[0];

      if (!userId) {
        throwError(400, 'Connection Error');
      }
      if (!productId) {
        throwError(400, 'CANNOT_SEARCH_Product');
      }
      if (!quantity) {
        throwError(400, 'CANNOT_SEARCH_Quantity');
      }
      await cartService.UpdateQuantityService(userId, productId, quantity);
      orderlist[0] = await cartService.speedCheckService(userId, productId);
    } else if (ArrayOfObjects.length > 1) {
      await Promise.all(
        ArrayOfObjects.map(async (item) => {
          const { productId, quantity } = item;
          item.userId = userId;
          console.log(item);

          if (!userId) {
            throwError(400, 'Connection Error');
          }
          if (!productId) {
            throwError(400, 'CANNOT_SEARCH_Product');
          }
          if (!quantity) {
            throwError(400, 'CANNOT_SEARCH_Quantity');
          }
          await cartService.UpdateQuantityService(userId, productId, quantity);
        })
      );
      orderlist = await Promise.all(
        ArrayOfObjects.map(async (item) => {
          const { productId, quantity } = item;
          item.userId = userId;
          return cartService.speedCheckService(userId, productId); // await 추가
        })
      );
    }

    return res.status(200).json({
      message: 'Update Success!',
      data: orderlist,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

// 주문단계로 들어간 장바구니 조회
const getOrderItemController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const OrderItem = await cartService.getOrderItemService(userId);
    if (!userId) {
      throwError(400, 'Connection Error');
    }
    if (!OrderItem) {
      throwError(400, 'CANNOT_SEARCH_CART');
    }
    return res.status(200).json({
      message: 'Order_Item',
      data: OrderItem,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

// 장바구니 삭제
const removeCartController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const arrayOfDelete = req.body.data;
    await Promise.all(
      arrayOfDelete.map(async (item) => {
        const { productId } = item;
        item.userId = userId;
        await cartService.removeCartService(userId, productId);
        if (!userId) {
          throwError(400, 'Connection Error');
        }
        if (!productId) {
          throwError(400, 'CANNOT_SEARCH_Product');
        }
      })
    );
    return res.status(200).json({
      message: 'Delete item!',
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

// 유저 정보 불러오기
const getUserInfoController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const userInformation = await cartService.getUserInfoService(userId);
    if (!userId) {
      throwError(400, 'Connection Error');
    }
    if (!userInformation) {
      throwError(400, 'CANNOT_USER_INFORMATION');
    }
    console.log(userInformation);
    return res.status(200).json({
      message: 'userInformation',
      data: userInformation,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getCartController,
  addNewProductController,
  updateQuantityController,
  updateOrderController,
  getOrderItemController,
  removeCartController,
  getUserInfoController,
};
