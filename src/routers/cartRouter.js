const express = require('express');
// const { verifyToken } = require('../middleware');
const { cartController } = require('../controllers');
const cartRouter = express.Router();

cartRouter.get('/', cartController.getCartController);
cartRouter.post('/', cartController.addNewProductController);
cartRouter.patch('/', cartController.updateOrderController);
cartRouter.delete('/', cartController.removeCartController);
cartRouter.get('/complete', cartController.getOrderItemController);

module.exports = { cartRouter };
