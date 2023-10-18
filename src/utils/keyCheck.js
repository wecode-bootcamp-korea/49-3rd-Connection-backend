const { throwError } = require('./throwError');

const keyCheck = (keysObject) => {
  Object.keys(keysObject).forEach((key) => {
    if (keysObject[key] === undefined) {
      throwError(400, `KEY_ERROR: ${key}`);
    }
  });
};

module.exports = { keyCheck };
