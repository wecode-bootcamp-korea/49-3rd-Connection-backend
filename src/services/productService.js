const { productDao, builder } = require('../models');

const getProductDetail = async (id) => {
  const data = await productDao.getProductDetail(id);
  data.forEach((item) => {
    item.totalPrice = parseInt(item.totalPrice);
    item.Rating = parseInt(item.Rating);
    item.discountAmount = parseInt(item.discountAmount);
  });
  return data;
};

module.exports = {
  getProductDetail,
};
