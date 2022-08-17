const createError = require("http-errors");

const { userValidate } = require("../helpers/validation");
const {
  signAccessToken,
  signRefreshToken,
  veryfyRefreshToken,
  REDIS_KEY_DEFAULT,
} = require("../helpers/jwt_service");

const RoleModel = require("../models/role.model");

module.exports = {
  initalData: async (req, res, next) => {
    try {
      const inital = new RoleModel({});
      await inital.save();
      return res.json({
        status: true,
        data: saveUser,
      });
    } catch (error) {
      next(error);
    }
  },
};
