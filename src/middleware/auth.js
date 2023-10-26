require('dotenv').config();
const jwt = require('jsonwebtoken');
const { throwError } = require('../utils/throwError');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  // 토큰 유무 확인
  if (!token) {
    throwError(401, 'access token denied');
  }

  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET
    );

    const userId = decoded['id'];
    console.log(userId);
    req.user = decoded;
    req.userId = userId;

    next();
  } catch (err) {
    console.error(err);
    throwError(403, 'invalid token');
  }
};
