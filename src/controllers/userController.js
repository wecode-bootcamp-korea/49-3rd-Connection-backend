const { userService } = require('../services');
const { keyCheck } = require('../utils/keyCheck');

const signUp = async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    zipCode,
    address,
    addressDetails,
  } = req.body;

  keyCheck({
    name,
    email,
    password,
    phoneNumber,
    zipCode,
    address,
    addressDetails,
  });

  await userService.signUp(
    name,
    email,
    password,
    phoneNumber,
    zipCode,
    address,
    addressDetails
  );

  res.status(200).json({
    message: 'SUCCESS',
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  keyCheck({
    email,
    password,
  });

  const token = await userService.signIn(email, password);

  res.status(200).json({
    message: 'SUCCESS',
    accessToken: token,
  });
};

module.exports = {
  signUp,
  signIn,
};
