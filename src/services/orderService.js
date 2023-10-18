const jwt = require('jsonwebtoken');
const { orderDao } = require('../models');

const createOrders = async (totalPrice, shippingmethod, payment_id) => {
  const newPost = await postDao.createPost(
    userId,
    threadsId,
    content,
    createdAt
  );
  return newPost;
};

module.exports = {
  createOrders: createOrders,
};
