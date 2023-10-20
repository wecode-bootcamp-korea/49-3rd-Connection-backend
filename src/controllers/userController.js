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

const checkDuplicatedEmail = async (req, res) => {
  const { email } = req.body;

  await userService.checkDuplicatedEmail(email);

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

const sellerSignUp = async (req, res) => {
  const userId = req.userId;

  const { name, image, zipCode, address, addressDetails, phoneNumber } =
    req.body;

  keyCheck({
    name,
    image,
    zipCode,
    address,
    addressDetails,
    phoneNumber,
  });

  await userService.sellerSignUp(
    name,
    image,
    zipCode,
    address,
    addressDetails,
    phoneNumber,
    userId
  );

  res.status(200).json({
    message: 'SUCCESS',
  });
};

const kakaoSignIn = async (req, res) => {
  const kakaoToken = req.query.code;

  const token = await userService.kakaoSignIn(kakaoToken);

  return res.status(200).json({
    message: 'SUCCESS',
    accessToken: token,
  });
};

const insertAddress = async (req, res) => {
  const userId = req.userId;

  const { phoneNumber, zipCode, address, addressDetails } = req.body;

  keyCheck({
    phoneNumber,
    zipCode,
    address,
    addressDetails,
  });

  await userService.insertAddress(
    phoneNumber,
    zipCode,
    address,
    addressDetails,
    userId
  );

  return res.status(200).json({
    message: 'SUCCESS',
  });
};

module.exports = {
  signUp,
  signIn,
  sellerSignUp,
  kakaoSignIn,
  insertAddress,
  checkDuplicatedEmail,
  sellerSignUp,
};
