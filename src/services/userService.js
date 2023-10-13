const { userDao } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { throwError } = require('../utils/throwError');

const findUser = async (userId) => {
  return await userDao.findById(userId);
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

  const existingUser = await userDao.findByEmail(email);
  if (existingUser) throwError(400, 'DUPLICATED_EMAIL_ADDRESS');

  const passwordRegx =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?!.* ).{8,16}$/;
  if (!password.match(passwordRegx)) throwError(400, 'INVALID_PASSWORD');

  const saltRounds = 12;
  const bcryptPassword = await bcrypt.hash(password, saltRounds);

  await userDao.signUp(
    name,
    email,
    bcryptPassword,
    phoneNumber,
    zipCode,
    address,
    addressDetails
  );
};

const signIn = async (email, password) => {
  const existingUser = await userDao.findByEmail(email);
  if (!existingUser) throwError(400, 'USER_NOT_FOUND');

  const checkPassword = await bcrypt.compare(password, existingUser.password);
  if (!checkPassword) throwError(400, 'WRONG_PASSWORD');

  const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET);

  return token;
};

module.exports = {
  findUser,
  signUp,
  signIn,
};
