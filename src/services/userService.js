const { userDao } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { throwError } = require('../utils/throwError');

const findUser = async (userId) => {
  return await userDao.findUserById(userId);
};

const signUp = async (
  name,
  email,
  password,
  phoneNumber,
  zipCode,
  address,
  addressDetails
) => {
  const emailRegx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  if (!email.match(emailRegx)) throwError(400, 'INVALID_EMAIL');

  const passwordRegx = /^(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?!.* ).{8,16}$/;
  if (!password.match(passwordRegx)) throwError(400, 'INVALID_PASSWORD');

  const saltRounds = 12;
  const bcryptPassword = await bcrypt.hash(password, saltRounds);

  await userDao.createUser(
    name,
    email,
    bcryptPassword,
    phoneNumber,
    zipCode,
    address,
    addressDetails
  );
};

const checkDuplicatedEmail = async (email) => {
  const existingUser = await userDao.findUserByEmail(email);

  if (existingUser) throwError(400, 'DUPLICATED_EMAIL_ADDRESS');
};

const signIn = async (email, password) => {
  const existingUser = await userDao.findUserByEmail(email);
  if (!existingUser) throwError(400, 'USER_NOT_FOUND');
  let isSeller = false;
  if (existingUser.sellerId != null) isSeller = true;

  const checkPassword = await bcrypt.compare(password, existingUser.password);
  if (!checkPassword) throwError(400, 'WRONG_PASSWORD');

  const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET);

  return { accessToken: token, isSeller: isSeller };
};

const sellerSignUp = async (
  name,
  image,
  zipCode,
  address,
  addressDetails,
  phoneNumber,
  userId
) => {
  const existingUser = await userDao.findUserById(userId);
  if (existingUser.sellerId !== null) throwError(400, 'ALREADY_SELLER');

  const existingSeller = await userDao.findSellerByName(name);
  if (existingSeller) throwError(400, 'INVALID_NAME');

  await userDao.createSeller(
    name,
    image,
    zipCode,
    address,
    addressDetails,
    phoneNumber,
    userId
  );
};

module.exports = {
  findUser,
  signUp,
  checkDuplicatedEmail,
  signIn,
  sellerSignUp,
};
