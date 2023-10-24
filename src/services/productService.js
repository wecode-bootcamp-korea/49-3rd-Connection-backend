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

const getTotalProductByCategoryId = async () => {
  const categoryIds = await productDao.getTotalCategoryId();
  const categoryId = categoryIds.map((item) => item.id);

  let result = await Promise.all(
    categoryId.map(async (categoryId) => {
      const joinQuery = await builder.joinQuery();
      console.log('조인쿼리 콘솔!', joinQuery);
      const whereQuery = await builder.whereQueryWithCategory(categoryId);
      const product = await productDao.getProducts(joinQuery, whereQuery);
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
      const whereQuery = await builder.whereQueryWithSeller(sellerId);
      const product = await productDao.getProducts('', whereQuery);
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
    joinQuery,
    whereQuery,
    orderingQuery,
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

const getProductId = async (filter) => {
  let id;
  if (filter.category == 0) {
    id = filter.seller;
  } else {
    id = filter.category;
  }
  return parseInt(id);
};

module.exports = {
  getProductDetail,
  getProductId,
  getProductRandomSellerId,
  getTotalProductByCategoryId,
  getNameById,
  getProducts,
};
