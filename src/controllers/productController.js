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

module.exports = {
  getCategoryProduct,
  getSellerProduct,
};
