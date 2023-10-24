const { productService } = require('../services');

const getCategoryProduct = async (req, res) => {
  try {
    const result = await productService.getTotalProductByCategoryId();

    return res.status(200).json({
      message: 'Success',
      data: result,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

const getSellerProduct = async (req, res) => {
  try {
    const result = await productService.getProductRandomSellerId();

    return res.status(200).json({
      message: 'Success',
      data: result,
    });
  } catch (error) {
    console.log('error', error);
    res.status(error.status).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const {
      sort = 'rating',
      limit = 12,
      offset = 0,
      categoryId = 0,
      sellerId = 0,
    } = req.query;

    const filter = { category: categoryId, seller: sellerId };

    const data = await productService.getProducts(filter, sort, limit, offset);
    const name = await productService.getNameById(filter);
    const id = await productService.getProductId(filter);
    return res.status(200).json({
      message: 'Success',
      name,
      id,
      data: data,
      totalQuantity: data.length,
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
      message: 'Success',
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
