const JWT = require("jsonwebtoken");

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };
    const secret = "KEY SECRET";
    const option = {
      expiresIn: "1h", // 10m 10s
    };
    JWT.sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports = {
  signAccessToken,
};
