const userDao = require('./userDao');
const productDao = require('./productDao');
const builder = require('./builder');
const cartDao = require('./cartDao');
const reviewDao = require('./reviewDao');
const orderDao = require('./orderDao');
const paymentDao = require('./paymentDao');

module.exports = {
  userDao,
  productDao,
  builder,
  cartDao,
  reviewDao,
  orderDao,
  paymentDao,
};
