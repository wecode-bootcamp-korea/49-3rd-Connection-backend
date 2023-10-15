const express = require('express');
const { productController } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/', productController.getCategoryProduct);

module.exports = {
  productRouter,
};
