const { productDao, builder } = require('../models');

const getNameById = async (filter) => {
  let name;
  let result;
  console.log(filter);
  if (filter.seller == 0) {
    name = await productDao.getCategoryNameById(filter.category);
    result = name[0].category_name;
  } else if (filter.category == 0) {
    name = await productDao.getSellerNameById(filter.seller);
    result = name[0].name;
  }
  console.log(name[0].category_name);
  console.log(name);
  return result;
};

const getProducts = async (filter, sort, limit, offset) => {
  console.log(filter);

  let whereQuery;
  if (filter.category) {
    whereQuery = await builder.whereQueryWithCategory(filter.category);
  } else {
    whereQuery = await builder.whereQueryWithSeller(filter.seller);
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
  getNameById,
  getProducts,
  getProductBySellerId,
};
