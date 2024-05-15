const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const redis = require("../databases/connection.redis");

const REDIS_KEY_DEFAULT = "jwt_access_token_";

const signAccessToken = async (userId) =>
  new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET;
    const option = {
      expiresIn: "1d", // 10m 10s 1d 1h
    };

    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

const signRefreshToken = async (userId) =>
  new Promise((resolve, reject) => {
    const payload = {
      userId,
    };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const option = {
      expiresIn: "1d",
    };

    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      redis.set(
        REDIS_KEY_DEFAULT + userId.toString(),
        token,
        "EX",
        24 * 60 * 60,
        (error) => {
          if (error) {
            return reject(createError.InternalServerError());
          }
          return resolve(token);
        }
      );
    });
  });

const verifyRefreshToken = (refreshToken) =>
  new Promise((resolve, reject) => {
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
      }
    );
  });

module.exports = {
  REDIS_KEY_DEFAULT,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
