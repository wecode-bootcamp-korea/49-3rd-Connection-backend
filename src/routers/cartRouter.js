const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { cartController } = require('../controllers');
const cartRouter = express.Router();

cartRouter.get('/', verifyToken, cartController.getCartController);
cartRouter.post('/', verifyToken, cartController.addNewProductController);
cartRouter.post(
  '/updatequantity',
  verifyToken,
  cartController.updateQuantityController
);
cartRouter.patch('/', verifyToken, cartController.updateOrderController);
cartRouter.delete('/', verifyToken, cartController.removeCartController);
cartRouter.get('/complete', verifyToken, cartController.getOrderItemController);
cartRouter.get(
  '/getuserinfo',
  verifyToken,
  cartController.getUserInfoController
);
// cartRouter.post(
//   '/cartrollback',
//   verifyToken,
//   cartController.rollbackController
// );

module.exports = { cartRouter };
