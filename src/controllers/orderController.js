const { orderService } = require('../services');

console.log('controller connected 연결 확인');

const createOrders = async (req, res) => {
  try {
    const userId = req.userId; //const { userId } = req;  // userId는 토큰에서 -> 미들웨어 사용

    // 필요한 값들 다 req 에서 받아옴
    const {
      // userId, // without token
      totalPrice,
      shippingMethod,
      paymentId,
      products,
    } = req.body;
    console.log(products);
    // await 는 이것들을 다음 단계(orderService)에 보내줄거야

    await orderService.createOrders(
      userId,
      totalPrice,
      shippingMethod,
      paymentId,
      products
    );

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(400).json({ message: '장바구니에 없는 제품 주문' });
    return res
      .status(400)
      .json({ message: '장바구니에 있는 수량보다 많이 주문' });
    return res.status(400).json({ message: '포인트 부족' });
  }
};

console.log('createOrders 확인 ');

module.exports = { createOrders };
