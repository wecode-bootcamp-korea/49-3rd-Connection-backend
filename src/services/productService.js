const { productDao, builder } = require('../models');

const getProductDetail = async (req, res) => {
  const data = await productDao.getProductDetail();
  data.forEach((item) => {
    item.totalPrice = parseInt(item.totalPrice);
    item.Rating = parseInt(item.Rating);
  });
  return data;
};

module.exports = {
  getProductDetail,
};
