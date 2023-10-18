const { productDao, builder } = require('../models');

const getProducts = async (filter, sort, limit, offset) => {
  let whereQuery;
  let selectQuery;
  let joinQuery = ``;

  if (filter.category) {
    selectQuery = await builder.selectQueryWithCategory();
    whereQuery = await builder.whereQueryWithCategory(filter.category);
    joinQuery = await builder.joinQueryWithCategory();
  }

  if (filter.seller) {
    selectQuery = await builder.selectQueryWithSeller();
    whereQuery = await builder.whereQueryWithSeller(filter.seller);
    joinQuery = await builder.joinQueryWithSeller();
  }

  const orderingQuery = await builder.ordering(sort);
  const limitOffsetQuery = await builder.limitOffsetQuery(limit, offset);

  let data = await productDao.getProducts(
    selectQuery,
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

module.exports = {
  getProducts,
};
