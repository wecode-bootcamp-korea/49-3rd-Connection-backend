const { productService } = require('../services');

const getCategoryProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await productService.getTotalProductByCategoryId(userId);

    console.log(result);

    return res.status(200).json({
      message: 'SUCCESS',
      data: result,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

const getSellerProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await productService.getProductRandomSellerId(userId);

    console.log(result);

    return res.status(200).json({
      message: 'SUCCESS',
      data: result,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      sort = 'rating',
      limit = 12,
      offset = 0,
      categoryId = 0,
      sellerId = 0,
    } = req.query;

    const filter = { category: categoryId, seller: sellerId };

    const data = await productService.getProducts(
      filter,
      sort,
      limit,
      offset,
      userId
    );
    const name = await productService.getNameById(filter);
    const quantity = await productService.getProductAmount(filter, userId);
    const id = await productService.getProductId(filter);
    return res.status(200).json({
      message: 'SUCCESS',
      name,
      id,
      data: data,
      totalQuantity: quantity,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};
const getProductDetail = async (req, res) => {
  try {
    const id = req.params.productId;
    const data = await productService.getProductDetail(id);

    return res.status(200).json({
      message: 'SUCCESS',
      product: data,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getProductDetail,
  getCategoryProduct,
  getSellerProduct,
  getProducts,
};
