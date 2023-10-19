const { productDao, builder } = require('../models');

const getTotalProductByCategoryId = async () => {
  const categoryIds = await productDao.getTotalCategoryId();
  const categoryId = categoryIds.map((item) => item.id);

  let result = await Promise.all(
    categoryId.map(async (categoryId) => {
      const product = await productDao.getTotalProductByCategoryId(categoryId);
      const categoryName = await productDao.getCategoryNameById(categoryId);

      return {
        categoryId,
        categoryName: categoryName[0].category_name,
        product,
      };
    })
  );

  result = JSON.parse(JSON.stringify(result), (key, value) => {
    // 숫자로 변환 가능한 경우 숫자로 변환
    return typeof value === 'string' && !isNaN(Number(value))
      ? Number(value)
      : value;
  });

  return result;
};

const getProductRandomSellerId = async (req, res) => {
  const sellerIds = await productDao.getRandomSellerId();

  const sellerId = sellerIds.map((item) => item.id);

  let result = await Promise.all(
    sellerId.map(async (sellerId) => {
      const product = await productDao.getTotalProductBySellerId(sellerId);
      const sellerName = await productDao.getSellerNameById(sellerId);

      return {
        sellerId,
        sellerName: sellerName[0].name,
        product,
      };
    })
  );

  result = JSON.parse(JSON.stringify(result), (key, value) => {
    // 숫자로 변환 가능한 경우 숫자로 변환
    return typeof value === 'string' && !isNaN(Number(value))
      ? Number(value)
      : value;
  });
  return result;
};

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
  getProductRandomSellerId,
  getTotalProductByCategoryId,
  getNameById,
  getProducts,
  getProductBySellerId,
};
