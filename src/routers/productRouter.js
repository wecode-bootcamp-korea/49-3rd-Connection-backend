const express = require('express');
const { productController } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/', productController.getProducts);

module.exports = {
  productRouter,
};
