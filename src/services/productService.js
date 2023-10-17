const { productDao, builder } = require('../models');

const getCategoryNameById = async (categoryId) => {
  const data = await productDao.getCategoryNameById(categoryId);
  return data;
};

const getSellerNameById = async (sellerId) => {
  const data = await productDao.getSellerNameById(sellerId);
  return data;
};

const getProductByCategoryId = async (categoryId, sort, limit, offset) => {
  const orderingQuery = await builder.ordering(sort);
  // console.log(orderingQuery);
  let data = await productDao.getProductByCategoryId(
    categoryId,
    orderingQuery,
    limit,
    offset
  );
  data.forEach((item) => {
    item.discountAmount = parseInt(item.discountAmount);
    item.reviewNumber = parseInt(item.reviewNumber);
    item.totalPrice = parseInt(item.totalPrice);
    item.rating = parseInt(item.rating);
  });

  return data;
};

const getProductBySellerId = async (sellerId, sort, limit, offset) => {
  const orderingQuery = await builder.ordering(sort);
  let data = await productDao.getProductBySellerId(
    sellerId,
    orderingQuery,
    limit,
    offset
  );

  data.forEach((item) => {
    item.discountAmount = parseInt(item.discountAmount);
    item.reviewNumber = parseInt(item.reviewNumber);
    item.totalPrice = parseInt(item.totalPrice);
    item.rating = parseInt(item.rating);
  });

  return data;
};

module.exports = {
  getCategoryNameById,
  getSellerNameById,
  getProductByCategoryId,
  getProductBySellerId,
};
