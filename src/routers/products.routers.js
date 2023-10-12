const express = require('express');

const { productsController } = require('../controllers');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProduct);

module.exports = {
  productsRouter,
};
