const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const redis = require('../databases/connection.redis');

const REDIS_KEY_DEFAULT = 'jwt_access_token_';

const signAccessToken = async (userId) => new Promise((resolve, reject) => {
  const payload = {
    userId,
  };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const option = {
    expiresIn: '30s', // 10m 10s
  };
  JWT.sign(payload, secret, option, (err, token) => {
    if (err) reject(err);
    resolve(token);
  });
});

const signRefreshToken = async (userId) => new Promise((resolve, reject) => {
  const payload = {
    userId,
  };
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const option = {
    expiresIn: '1d',
  };
  JWT.sign(payload, secret, option, (err, token) => {
    if (err) reject(err);
    redis.set(
      REDIS_KEY_DEFAULT + userId.toString(),
      token,
      'EX',
      24 * 60 * 60,
      (error) => {
        if (error) {
          return reject(createError.InternalServerError());
        }
        return resolve(token);
      },
    );
  });
});

const verifyAccessToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized());
  }
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name) {
        switch (err.name) {
          case 'TokenExpiredError':
            break;
          case 'JsonWebTokenError':
            return next(createError.Unauthorized());
          case 'NotBeforeError':
            break;
          default:
            break;
        }
      }
      return next(createError.Unauthorized(err.message));
    }
    req.payload = payload;
    next();
  });
};

const verifyRefreshToken = (refreshToken) => new Promise((resolve, reject) => {
  JWT.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, payload) => {
      if (err) {
        reject(err);
      }
      const { userId } = payload;
      redis.get(REDIS_KEY_DEFAULT + userId, (error, reply) => {
        if (error) {
          return reject(createError.InternalServerError());
        }
        if (refreshToken === reply) {
          return resolve(payload);
        }
        return reject(createError.Unauthorized());
      });
    },
  );
});

module.exports = {
  REDIS_KEY_DEFAULT,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
