const cartController = require('./cartControllers');
const userController = require('./userController');
const productController = require('./productController');
const reviewController = require('./reviewController');
const orderController = require('./orderController');
const paymentController = require('./paymentController');

module.exports = {
  userController,
  productController,
  cartController,
  reviewController,
  orderController,
  paymentController,
};
