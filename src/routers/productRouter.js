const express = require('express');
const { productController } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/', productController.getCategoryProduct);
productRouter.get('/g', productController.getSellerProduct);

module.exports = {
  productRouter,
};
