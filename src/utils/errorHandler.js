const asyncWrap = (asyncController) => {
  return async (req, res, next) => {
    try {
      await asyncController(req, res);
    } catch (error) {
      next(error);
    }
  };
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // let statusCode = 400;
  // let message = err.message;

  // if (err.message === '장바구니에 없는 제품 주문') {
  //   statusCode = 400;
  //   message = err.message;
  // } else if (err.message === '장바구니에 있는 수량보다 많이 주문') {
  //   statusCode = 400;
  //   message = err.message;
  // } else if (err.message === '포인트 부족') {
  //   statusCode = 400;
  //   message = err.message;
  // }

  res.status(err.status).json({ message: err.message });
};

module.exports = { asyncWrap, errorHandler };
