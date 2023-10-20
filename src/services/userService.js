const { userDao } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { throwError } = require('../utils/throwError');
const { keyCheck } = require('../utils/keyCheck');

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

  const checkPassword = await bcrypt.compare(password, existingUser.password);
  if (!checkPassword) throwError(400, 'WRONG_PASSWORD');

  const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET);

  return { accessToken: token, isSeller: !!existingUser.sellerId };
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
    userId,
    sellerId
  );
};

const kakaoSignIn = async (code) => {
  let kakaoToken;

  const queryString = `grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&code=${code}`;

  await axios
    .post(`https://kauth.kakao.com/oauth/token`, queryString, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
    .then((res) => {
      kakaoToken = res.data.access_token;
    })
    .catch((err) => {
      console.log('Error : ', err);
    });

  let result;
  await axios
    .get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log('error : ', err);
    });

  const kakaoId = result.id;
  const name = result.properties.nickname;
  const email = result.kakao_account.email;

  const user = await userDao.findUserByKakao(kakaoId);

  let userId = user?.id;

  if (!user) {
    const result = await userDao.kakaoSignIn(kakaoId, name, email);
    userId = result.insertId;
  }

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

  return {
    accessToken: token,
    isSeller: !!user.sellerId,
    isAddress: !!user.zipCode,
  };
};

const insertAddress = async (
  phoneNumber,
  zipCode,
  address,
  addressDetails,
  userId
) => {
  const exisitingUser = await userDao.findUserById(userId);

  if (exisitingUser.zipCode) throwError(409, 'ALREADY');
  await userDao.insertAddress(
    phoneNumber,
    zipCode,
    address,
    addressDetails,
    userId
  );
};

module.exports = {
  findUser,
  signUp,
  signIn,
  sellerSignUp,
  kakaoSignIn,
  insertAddress,
  checkDuplicatedEmail,
};
