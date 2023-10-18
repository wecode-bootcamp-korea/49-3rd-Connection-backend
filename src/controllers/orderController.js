const express = require('express');
const { orderService } = require('../services');

const createOrders = async (req, res) => {
  req.userId = userId;

  // 1) orders table 주문 정보 저장
  try {
    console.log('orderController connected');
    const { totalPrice, shippingMethod, paymentId } = req.body;

    await orderService.createOrders(
      userId,
      totalPrice,
      shippingMethod,
      paymentId
    ); // await 는 이것들을 다음 단계에 보내줄거야

    return res.status(200).json({ message: 'Created Orders 주문정보 저장' });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'FAILED creating orders 주문정보 저장 실패' });
  }

  // 2) orderDetails table 주문 정보 저장
  try {
    const { orderId, productId, quantity } = req.body;

    await orderService.createOrderDetails(userId, orderId, productId, quantity);
    return res
      .status(200)
      .json({ message: 'Created OrderDetails_ productid, 수량 저장' });
  } catch (error) {
    return res.status(400).json({
      message: 'FAILED creating OrderDetails_ productid, 수량 저장 실패',
    });
  }

  // 3) carts 에서 삭제
  try {
    const { userId, productId, quantity } = req.body;

    await orderService.deleteCartsProducts(userId, productId, quantity);
    return res.status(200).json({
      message: 'Deleted Ordered Products From Carts_ 장바구니 삭제 완료',
    });
  } catch (error) {
    return res.status(400).json({
      message:
        'FAILED Deleting Ordered Products From Carts_ 장바구니 삭제 실패',
    });
  }
};

module.exports = {
  createOrders,
};
