const { orderService } = require('../services');

console.log('controller connected 연결 확인');

const createOrders = async (req, res) => {
  try {
    // req.userId = userId; // 토큰 있을떄 (미들웨어 사용)

    // 필요한 값들 다 req 에서 받아옴
    const {
      userId,
      totalPrice,
      shippingMethod,
      paymentId,
      productId,
      quantity,
    } = req.body;

    // await 는 이것들을 다음 단계(orderService)에 보내줄거야

    await orderService.createOrders(
      userId,
      totalPrice,
      shippingMethod,
      paymentId,
      productId,
      quantity
    );

    return res.status(200).json({ message: 'Created Orders 주문정보 저장' });
  } catch (error) {
    console.error(error);
  }
};

console.log('createOrders 확인 ');

module.exports = { createOrders };
