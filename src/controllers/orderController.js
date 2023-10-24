const { orderService } = require('../services');

const createOrder = async (req, res) => {
  try {
    const { cart } = req.query;
    const { userId, totalPrice, shippingMethod, paymentId, products } =
      req.body;
    await orderService.createOrder(
      cart,
      userId,
      totalPrice,
      shippingMethod,
      paymentId,
      products
    );
    return res.status(200).json({
      message: 'Success',
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = { createOrder };
