const { productsService } = require('../services');

const getProduct = async (req, res) => {
  try {
    let {
      category,
      sort = "rating",
      product_type,
      offset = 0,
      limit = 12,
    } = req.query;
    const userId = req.userId;
    const productList = await productsService.getProductList(
      userId,
      category,
      sort,
      product_type,
      offset,
      limit
    );
