const userDao = require('./userDao');
const productDao = require('./productDao');
const builder = require('./builder');
const orderDao = require('./orderDao');
const { AppDataSource } = require('./dataSource');
const cartDao = require('./cartDao');
const reviewDao = require('./reviewDao');
const paymentDao = require('./paymentDao');

module.exports = {
  userDao,
  productDao,
  builder,
  orderDao,
  AppDataSource,
  cartDao,
  reviewDao,
  paymentDao,
};
