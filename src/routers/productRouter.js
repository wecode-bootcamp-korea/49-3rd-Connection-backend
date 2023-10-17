const express = require('express');
const { productController } = require('../controllers');

const productRouter = express.Router();

productRouter.get(
  '/category/:categoryId',
  productController.getProductByCategoryId
);
productRouter.get('/seller/:sellerId', productController.getProductBySellerId);

module.exports = {
  productRouter,
};
