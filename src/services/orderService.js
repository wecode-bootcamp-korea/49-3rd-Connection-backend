const { orderDao, userDao } = require('../models');
const { throwError } = require('../utils/throwError');
const { AppDataSource } = require('../models');

const countCart = async (userId) => {
  const count = await userDao.countCart(userId);
  console.log(count.quantity);

  return count.quantity;
};

const createOrders = async (
  userId,
  totalPrice,
  shippingMethod,
  paymentId,
  products
) => {
  const isUsersPoints = await orderDao.isUsersPoints(userId);

  if (totalPrice > isUsersPoints) throwError(400, 'not enough points');

  const newOrder = await orderDao.createOrders(
    userId,
    totalPrice,
    shippingMethod,
    paymentId
  );

  const orderId = newOrder;

  const remainPoints = isUsersPoints - totalPrice;
  const updatePoints = await orderDao.updatePoints(userId, remainPoints);

  const orderDetailsPromises = [];
  const cartUpdatePromises = [];

  for (let i = 0; i < products.length; i++) {
    const productId = products[i].productId;
    const quantity = products[i].quantity;

    const isProductInCarts = await orderDao.isProductInCarts(userId, productId);

    if (productId !== isProductInCarts)
      throwError(400, 'ordered productId is not in the carts');

    const cartQuantity = await orderDao.cartQuantity(userId, productId);
    const updateQuantity = cartQuantity - quantity;

    if (cartQuantity < quantity)
      throwError(400, 'ordered more products than cartsQuantity');

    const newOrderDetails = orderDao.newOrderDetails(
      orderId,
      productId,
      quantity
    );
    orderDetailsPromises.push(newOrderDetails);

    if (cartQuantity == quantity) {
      const deleteAllCarts = await orderDao.deleteAllCarts(
        userId,
        productId,
        quantity
      );
      cartUpdatePromises.push(deleteAllCarts);
    } else {
      const updateCarts = await orderDao.updateCarts(
        userId,
        productId,
        updateQuantity
      );
      cartUpdatePromises.push(updateCarts);
    }
  }
  await Promise.all(orderDetailsPromises);
  await Promise.all(cartUpdatePromises);

  return userDao.findUserById(userId);
};

// ----------------------바로구매 ------------------------------------

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

module.exports = { createOrders, createOrder, countCart };
