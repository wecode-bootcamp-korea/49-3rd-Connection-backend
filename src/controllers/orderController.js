const express = require('express');
const { orderService } = require('../services');

const createOrders = async (req, res) => {
  try {
    req.userId = userId;
    console.log('orderController connected');

    // 필요한 값들 다 req 에서 받아옴
    const {
      userId,
      totalPrice,
      shippingMethod,
      paymentId,
      orderId,
      productId,
      quantity,
    } = req.body;

    // await 는 이것들을 다음 단계(orderService)에 보내줄거야
    await orderService.createOrders(
      userId,
      totalPrice,
      shippingMethod,
      paymentId,
      orderId,
      productId,
      quantity
    );

    return res.status(200).json({ message: 'Created Orders 주문정보 저장' });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'FAILED creating orders 주문정보 저장 실패' });
  }
};
