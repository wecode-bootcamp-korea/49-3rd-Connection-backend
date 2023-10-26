const { userService } = require('../services');
const { keyCheck } = require('../utils/keyCheck');
const { getGeoCode } = require('../utils/AddressConverter');

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

  const userAddress = address;
  console.log(userAddress);

  const geoCode = await getGeoCode(userAddress);
  console.log(geoCode);

  const latitude = geoCode.latitude;
  const longitude = geoCode.longitude;

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
    addressDetails,
    latitude,
    longitude
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

  const image = req.file.location;

  const { name, zipCode, address, addressDetails, phoneNumber } = JSON.parse(
    req.body.seller
  );

  const userAddress = address;
  const geoCode = await getGeoCode(userAddress);
  const latitude = geoCode.latitude;
  const longitude = geoCode.longitude;

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
    latitude,
    longitude,
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

  const geoCode = await getGeoCode(address);
  const latitude = geoCode.latitude;
  const longitude = geoCode.longitude;

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
    latitude,
    longitude,
    userId
  );

  return res.status(200).json({
    message: 'SUCCESS',
  });
};

const insertPremium = async (req, res) => {
  const userId = req.userId;

  const { paymentId } = req.body;

  keyCheck({
    paymentId,
  });

  await userService.insertPremium(userId, paymentId);

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
  insertPremium,
};
