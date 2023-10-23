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
  res.status(err.status).json({ message: err.message });
};

module.exports = { asyncWrap, errorHandler };
