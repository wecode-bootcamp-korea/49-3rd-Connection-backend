const throwError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

module.exports = {
  throwError,
};
