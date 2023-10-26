const express = require('express');
const { productController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

const productRouter = express.Router();

productRouter.get(
  '/category',
  verifyToken,
  productController.getCategoryProduct
);
productRouter.get('/seller', verifyToken, productController.getSellerProduct);
productRouter.get('/', verifyToken, productController.getProducts);
productRouter.get('/:productId', productController.getProductDetail);

module.exports = {
  productRouter,
};
