const { productDao, builder } = require('../models');

const getCategoryNameById = async (categoryId) => {
  const data = await productDao.getCategoryNameById(categoryId);
  return data;
};

const getSellerNameById = async (sellerId) => {
  const data = await productDao.getSellerNameById(sellerId);
  return data;
};

const getProducts = async (filter, sort, limit, offset) => {
  console.log(filter);

  let whereQuery;
  if (filter.category) {
    whereQuery = await builder.whereQueryWithCategory(filter.category);
  }

  const orderingQuery = await builder.ordering(sort);
  const joinQuery = await builder.joinQuery();
  const limitOffsetQuery = await builder.limitOffsetQuery(limit, offset);
  let data = await productDao.getProducts(
    orderingQuery,
    joinQuery,
    whereQuery,
    limitOffsetQuery
  );
  data.forEach((item) => {
    item.discountAmount = parseInt(item.discountAmount);
    item.reviewNumber = parseInt(item.reviewNumber);
    item.totalPrice = parseInt(item.totalPrice);
    item.rating = parseInt(item.rating);
  });

  return data;
};

const getProductBySellerId = async (filter, sort, limit, offset) => {
  const orderingQuery = await builder.ordering(sort);
  const whereQuery = await builder.whereQueryWithSeller(filter.seller);
  let data = await productDao.getProductBySellerId(
    whereQuery,
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
  getProducts,
  getProductBySellerId,
};
