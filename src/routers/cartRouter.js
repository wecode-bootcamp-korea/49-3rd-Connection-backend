const express = require('express');
// const { verifyToken } = require('../middleware');
const { cartController } = require('../controllers');
const cartRouter = express.Router();

cartRouter.get('/', cartController.getCartController);
// cartRouter.post('/', verifyToken, cartController.addNewProductController);
// cartRouter.patch('/', verifyToken, cartController.UpdateOrderController);
// cartRouter.delete('/', verifyToken, cartController.removeCarcontroller);

module.exports = cartRouter;
