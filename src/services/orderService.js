const jwt = require('jsonwebtoken');
const { orderDao } = require('../models');

const createOrders = async (totalPrice, shippingMethod, paymentId) => {
  const newOrder = await orderDao.createPost(
    totalPrice,
    shippingMethod,
    paymentId
  );
  return newOrder;
};

module.exports = {
  createOrders: createOrders,
};
