const { productDao, builder } = require('../models');

// const getSellerProduct = async (categoryId, sort, limit, offset) => {
//   const orderingQuery = await builder.ordering(sort);
//   console.log(orderingQuery);
//   const data = await productDao.getSellerProduct(
//     categoryId,
//     orderingQuery,
//     limit,
//     offset
//   );

//   return data;
// };

const getCategoryProduct = async (req, res) => {
  const data = await productDao.getCategorylist();
  return data;
};

const getSellerProduct = async (req, res) => {
  const data = await productDao.getSellerlist();
  return data;
};

module.exports = {
  // getSellerProduct,
  getCategoryProduct,
  getSellerProduct,
};
