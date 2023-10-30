const { orderService, userService, cartService } = require('../services');

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
      message: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

const createOrders = async (req, res) => {
  try {
    const userId = req.userId;

    console.log(userId);
    const { totalPrice, shippingMethod, paymentId, products } = req.body;
    console.log(totalPrice, shippingMethod, paymentId, products);

    await orderService.createOrders(
      userId,
      totalPrice,
      shippingMethod,
      paymentId,
      products
    );

    const points = await userService.findUser(userId);

    const countCart = await orderService.countCart(userId);
    console.log(countCart);

    return res.status(200).json({
      message: 'SUCCESS',
      points: points.points,
      countCart: countCart,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = { createOrders, createOrder };
