const jwt = require('jsonwebtoken');
const { orderDao } = require('../models');

const createOrders = async (totalPrice, shippingMethod, paymentId) => {
  const newOrder = await orderDao.createOrders(
    totalPrice,
    shippingMethod,
    paymentId
  );
  return newOrder;
};

const createOrderDetails = async (productId, quantity) => {
  const newOrderDetails = await orderDao.createOrderDetails(
    productId,
    quantity
  );
  return newOrderDetails;
};

module.exports = {
  createOrders: createOrders,
  createOrderDetails: createOrderDetails,
};
