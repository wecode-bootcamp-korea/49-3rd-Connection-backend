const express = require('express');
const { orderService } = require('../services');

const createOrders = async (req, res) => {
  try {
    console.log('orderController connected');
    const { totalPrice, shippingMethod, paymentId } = req.body;

    await orderService.createOrders(totalPrice, shippingMethod, paymentId);

    return res.status(200).json({ message: 'Created Orders 주문정보 저장' });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'FAILED creating orders 주문정보 저장 실패' });
  }
};

const createOrderDetails = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    await orderService.createOrderDetails(productId, quantity);
    return res
      .status(200)
      .json({ message: 'Created OrderDetails_ productid, 수량 저장' });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'FAILED creating OrderDetails_ productid, 수량 저장 실패',
      });
  }
};

module.exports = {
  createOrders,
};
