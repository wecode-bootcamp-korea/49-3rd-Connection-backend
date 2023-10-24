const { orderDao } = require('../models');
const { throwError } = require('../utils/throwError');
const { AppDataSource } = require('../models');

const createOrder = async (
  cart,
  userId,
  totalPrice,
  shippingMethod,
  paymentId,
  products
) => {
  await AppDataSource.transaction(async () => {
    if (cart) {
      const orderId = await orderDao.createOrder(
        userId,
        totalPrice,
        shippingMethod,
        paymentId
      );

      const orderDetail = products.map(async (product) => {
        const productId = product.productId;
        const quantity = product.quantity;

        const cartQuantity = await orderDao.checkCartQuantity(
          userId,
          productId
        );
        if (cartQuantity - quantity < 0) {
          throwError(400, '카트에 그거 없는데요');

          const point = await orderDao.checkUserPoints(userId);
          console.log('유저가 가진돈:', point);
          if (point < totalPrice) {
            throwError(400, '돈이 부족해요');
          }
          await orderDao.modifyPoint(totalPrice, userId);
        }

        await orderDao.createOrderDetail(orderId, productId, quantity);

        if (cartQuantity[0].quantity == quantity) {
          await orderDao.deleteCart(userId, productId);
        } else {
          await orderDao.modifyCart(quantity, userId, productId);
        }
      });
      await Promise.all(orderDetail);
    } else {
      const point = await orderDao.checkUserPoints(userId);
      console.log('유저가 가진돈:', point);
      if (point < totalPrice) {
        throwError(400, '돈이 부족해요');
      }
      await orderDao.modifyPoint(totalPrice, userId);

      const orderId = await orderDao.createOrder(
        userId,
        totalPrice,
        shippingMethod,
        paymentId
      );

      const productId = products[0].productId;
      const quantity = products[0].quantity;

      await orderDao.createOrderDetail(orderId, productId, quantity);
    }
  });
};

module.exports = { createOrder };
