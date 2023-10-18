const express = require('express');
const { verifyToken } = require('../middleware');
const { cartController } = require('../controllers');
const cartRouter = express.Router();

cartRouter.get('/', verifyToken, cartController.getCartController);
cartRouter.post('/', verifyToken, cartController.addNewProductController);
cartRouter.patch('/', verifyToken, cartController.UpdatequantityController);
cartRouter.delete('/', verifyToken, cartController.removeCarcontroller);

module.exports = cartRouter;
