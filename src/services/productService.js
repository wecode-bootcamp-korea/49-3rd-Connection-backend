const { productDao, builder } = require('../models');
const { getDistance } = require('../utils/getDistance');

const getProductId = async (filter) => {
  let id;

  if (filter.category == 0) {
    id = parseInt(filter.seller, 10);
  } else {
    id = parseInt(filter.category, 10);
  }

  return id;
};

const getProductAmount = async (filter, userId) => {
  const sellers = await productDao.getSellerCoordinates();
  const user = await productDao.getUserCoordinates(userId);
  const userLat = user[0].latitude;
  const userLon = user[0].longitude;
  console.log(user);
  console.log(sellers);

  const nearbySellers = sellers.filter((seller) => {
    const sellerLat = seller.latitude;
    const sellerLon = seller.longitude;

    const distance = getDistance(userLat, userLon, sellerLat, sellerLon);
    console.log(distance);
    return distance < 5000; // 5km 미만인 경우만 필터링
  });
  const nearbySellerIds = nearbySellers.map((seller) => seller.id);
  console.log('셀러아이디:', nearbySellerIds);

  let id;
  let whereQuery;
  if (filter.category == 0) {
    id = filter.seller;
    whereQuery = await builder.whereQueryWithSeller(id);
  } else {
    id = filter.category;
    whereQuery = await builder.whereQueryWithCategory(id);
  }

  const amount = await productDao.getProductAmount(whereQuery, nearbySellerIds);
  return amount;
};

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

const getTotalProductByCategoryId = async (userId) => {
  const sellers = await productDao.getSellerCoordinates();
  const user = await productDao.getUserCoordinates(userId);
  const userLat = user[0].latitude;
  const userLon = user[0].longitude;
  console.log(user);
  console.log(sellers);

  const nearbySellers = sellers.filter((seller) => {
    const sellerLat = seller.latitude;
    const sellerLon = seller.longitude;

    const distance = getDistance(userLat, userLon, sellerLat, sellerLon);
    console.log(distance);
    return distance < 5000; // 5km 미만인 경우만 필터링
  });
  const nearbySellerIds = nearbySellers.map((seller) => seller.id);
  console.log('셀러아이디:', nearbySellerIds);

  const categoryIds = await productDao.getTotalCategoryId();
  const categoryId = categoryIds.map((item) => item.id);

  let result = await Promise.all(
    categoryId.map(async (categoryId) => {
      const joinQuery = await builder.joinQuery();
      console.log('조인쿼리 콘솔!', joinQuery);
      const whereQuery = await builder.whereQueryWithCategory(categoryId);
      const product = await productDao.getProducts(
        joinQuery,
        whereQuery,
        nearbySellerIds
      );
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

const getProductRandomSellerId = async (userId) => {
  const sellers = await productDao.getSellerCoordinates();
  const user = await productDao.getUserCoordinates(userId);
  const userLat = user[0].latitude;
  const userLon = user[0].longitude;
  console.log(user);
  console.log(sellers);

  const nearbySellers = sellers.filter((seller) => {
    const sellerLat = seller.latitude;
    const sellerLon = seller.longitude;

    const distance = getDistance(userLat, userLon, sellerLat, sellerLon);
    console.log(distance);
    return distance < 5000; // 5km 미만인 경우만 필터링
  });
  const nearbySellerIds = nearbySellers.map((seller) => seller.id);
  console.log('셀러아이디:', nearbySellerIds);

  const sellerIds = await productDao.getRandomSellerId(nearbySellerIds);

  const sellerId = sellerIds.map((item) => item.id);

  let result = await Promise.all(
    sellerId.map(async (sellerId) => {
      const whereQuery = await builder.whereQueryWithSeller(sellerId);
      const product = await productDao.getProduct('', whereQuery);
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

const getProducts = async (filter, sort, limit, offset, userId) => {
  const sellers = await productDao.getSellerCoordinates();
  const user = await productDao.getUserCoordinates(userId);
  const userLat = user[0].latitude;
  const userLon = user[0].longitude;
  console.log(user);
  console.log(sellers);

  const nearbySellers = sellers.filter((seller) => {
    const sellerLat = seller.latitude;
    const sellerLon = seller.longitude;

    const distance = getDistance(userLat, userLon, sellerLat, sellerLon);
    console.log(distance);
    return distance < 5000; // 5km 미만인 경우만 필터링
  });
  const nearbySellerIds = nearbySellers.map((seller) => seller.id);

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
  console.log('셀러아이디:', nearbySellerIds);
  let data = await productDao.getProducts(
    joinQuery,
    whereQuery,
    nearbySellerIds,
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

module.exports = {
  getProductId,
  getProductAmount,
  getProductDetail,
  getProductRandomSellerId,
  getTotalProductByCategoryId,
  getNameById,
  getProducts,
};
