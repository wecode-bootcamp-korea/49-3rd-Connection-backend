const throwError = (status, message) => {
  const error = new Error(message);
  // error.message = message;
  error.status = status;
  throw error;
};

module.exports = {
  throwError,
};
