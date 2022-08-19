const createError = require("http-errors");

const { userValidate } = require("../helpers/validation");
const {
  signAccessToken,
  signRefreshToken,
  veryfyRefreshToken,
  REDIS_KEY_DEFAULT,
} = require("../helpers/jwt_service");

const UserModel = require("../models/user.model");
const client = require("../datasources/connection.redis");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { error } = userValidate(req.body);
      const { email, password } = req.body;

      if (error) {
        console.log(`Error:: ${error}`);
        throw createError(error.details[0].message);
      }

      // if (!email || !password) {
      //   throw createError.BadRequest();
      // }
      
      const isExits = await UserModel.findOne({
        username: email,
      });
      if (isExits) {
        throw createError.Conflict(`${email} is ready been register`);
      }

      // mid don't support method create
      // const isCreate = await UserModel.create({
      //   username: email,
      //   password: password,
      // });

      const user = await UserModel({
        username: email,
        password: password,
        roles: ['user']
      });

      const saveUser = await user.save();

      return res.json({
        status: true,
        data: saveUser,
      });
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw createError.BadRequest();
      }
      const { userId } = await veryfyRefreshToken(refreshToken);
      const accessToken = await signAccessToken(userId);
      const refrToken = await signRefreshToken(userId);
      return res.json({
        accessToken,
        refreshToken: refrToken,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { error } = userValidate(res.body);
      const { email, password } = req.body;
      if (error) {
        throw createError(error.details[0].message);
      }
      const isUser = await UserModel.findOne({
        username: email,
      });
      if (!isUser) {
        throw createError.NotFound("User not registered");
      }
      const isValid = await isUser.isCheckPassword(password);
      if (!isValid) {
        throw createError.Unauthorized();
      }
      const accessToken = await signAccessToken(isUser._id);
      const refreshToken = await signRefreshToken(isUser._id);
      return res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw createError.BadRequest();
      }
      const { userId } = await veryfyRefreshToken(refreshToken);
      client.del(REDIS_KEY_DEFAULT + userId.toString(), (err, reply) => {
        if (err) {
          throw createError.InternalServerError();
        }
        res.json({
          status: true,
          message: "Logout",
        });
      });
    } catch (error) {
      next(error);
    }
  },
  getListAccount: async (req, res, next) => {
    try {
      return res.json({ status: true });
    } catch (error) {
      next(error);
    }
  },
  testErrorApi: async (req, res, next) => {
    try {
      console.log("Don't find arg", a);
      return res.json({ status: true });
    } catch (error) {
      next(error);
    }
  },
};
