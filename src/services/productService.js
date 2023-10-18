const { productDao, builder } = require('../models');

const getProductDetail = async (req, res) => {
  const data = await productDao.getProductDetail();
  return data;
};

module.exports = {
  getProductDetail,
};
