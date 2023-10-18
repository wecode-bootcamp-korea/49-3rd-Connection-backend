const express = require('express');
const { productController } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/detail', productController.getProductDetail);

module.exports = {
  productRouter,
};
