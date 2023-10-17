const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const jwt = require('jsonwebtoken');
const { userDao } = require('../models');

passport.use(
  'kakao',
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: '/users/kakao/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await userDao.findByKakao(profile.id);

        const kakaoId = profile.id;
        const name = profile.displayName;
        const email = profile._json.kakao_account.email;

        if (!user) {
          await userDao.kakaoSignIn(kakaoId, name, email);
        }

        const existingUser = await userDao.findByEmail(email);
        let isSeller = false;
        let isAddress = false;

        if (existingUser.seller_id != null) isSeller = true;
        if (existingUser.zip_code != null) isAddress = true;

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return done(null, { token, isSeller, isAddress });
      } catch (error) {
        return done(error);
      }
    }
  )
);
