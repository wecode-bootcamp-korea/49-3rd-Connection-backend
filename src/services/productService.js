const { productDao, builder } = require('../models');

const getProductByCategoryId = async (categoryId, sort, limit, offset) => {
  const orderingQuery = await builder.ordering(sort);
  console.log(orderingQuery);
  const data = await productDao.getProductByCategoryId(
    categoryId,
    orderingQuery,
    limit,
    offset
  );

  return data;
};

const getProductBySellerId = async (sellerId, sort, limit, offset) => {
  const orderingQuery = await builder.ordering(sort);
  const data = await productDao.getProductBySellerId(
    sellerId,
    orderingQuery,
    limit,
    offset
  );
  return data;
};

module.exports = {
  getProductByCategoryId,
  getProductBySellerId,
};
