const jwt = require('jsonwebtoken');
const { orderDao } = require('../models');

const B = async () => {
  const A = await userDao.C();
  return A;
};

module.exports = {
  B: B,
};
