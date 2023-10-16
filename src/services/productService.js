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

const getTotalProductBySellerId = async (sellerId) => {
  const product = await productDao.getTotalProductBySellerId(sellerId);

  product.forEach((item) => {
    item.discountAmount = parseInt(item.discountAmount);
    item.reviewNumber = parseInt(item.reviewNumber);
    item.totalPrice = parseInt(item.totalPrice);
    item.rating = parseInt(item.rating);
  });

  return product;
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
  getProductBySellerId,
  getProductRandomSellerId,
  getTotalProductBySellerId,
  getTotalProductByCategoryId,
  getCategoryNameById,
  getSellerNameById,
  getProductByCategoryId,
  getProductBySellerId,
};
