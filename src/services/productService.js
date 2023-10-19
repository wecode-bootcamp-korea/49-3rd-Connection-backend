const { productDao, builder } = require('../models');

const getProductDetail = async (id) => {
  const data = await productDao.getProductDetail(id);
  data.forEach((item) => {
    item.totalPrice = parseInt(item.totalPrice);
    item.rating = parseInt(item.rating);
    item.discountAmount = parseInt(item.discountAmount);
    item.reviewNumbers = parseInt(item.reviewNumbers);
  });
  console.log('data', data);
  return data;
};

module.exports = {
  getProductDetail,
};
