const express = require('express');
const { productController } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/category', productController.getCategoryProduct);
productRouter.get('/seller', productController.getSellerProduct);
productRouter.get('/', productController.getProducts);

module.exports = {
  productRouter,
};
