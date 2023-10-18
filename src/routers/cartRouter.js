const express = require('express');
// const { verifyToken } = require('../middleware');
const { cartController } = require('../controllers');
const cartRouter = express.Router();

cartRouter.get('/', cartController.getCartController);
// cartRouter.post('/', cartController.addNewProductController);
// cartRouter.patch('/', cartController.UpdatequantityController);
// cartRouter.delete('/', verifyToken, cartController.removeCarcontroller);

module.exports = cartRouter;
