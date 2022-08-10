const JWT = require("jsonwebtoken");
const createError = require("http-errors");

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const option = {
      expiresIn: "30s", // 10m 10s
    };
    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const option = {
      expiresIn: "1y",
    };
    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const veryfyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createError.Unauthorized());
  }
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name) {
        switch (err.name) {
          case "TokenExpiredError":
            break;
          case "JsonWebTokenError":
            return next(createError.Unauthorized());
          case "NotBeforeError":
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

const veryfyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      }
    );
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  veryfyAccessToken,
  veryfyRefreshToken,
};
