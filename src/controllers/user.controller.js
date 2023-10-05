const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");

const {
  userValidate,
  loginWithGoogleValidate,
} = require("../helpers/validation");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  REDIS_KEY_DEFAULT,
} = require("../helpers/jwt_service");

const UserModel = require("../models/user.model");
const redisClient = require("../databases/connection.redis");

const { GOOGLE_CLIENT_ID } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
      const { error } = userValidate(req.body);

      if (error) {
        throw createError(error.details[0].message);
      }

      const { email, password } = req.body;
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

      const user = new UserModel({
        username: email,
        email,
        password,
        isSetPassword: true,
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
      const { userId } = await verifyRefreshToken(refreshToken);
      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);
      return res.json({
        accessToken,
        refreshToken: refToken,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { error } = userValidate(res.body);
      if (error) {
        throw createError(error.details[0].message);
      }
      const { email, password } = req.body;
      const isUser = await UserModel.findOne({
        username: email,
      });
      if (!isUser) {
        throw createError.NotFound("User not registered");
      }
      try {
        const isValid = await isUser.isCheckPassword(password);
        if (!isValid) {
          throw createError.Unauthorized("Username/password not valid");
        }
      } catch (err) {
        throw createError.Unauthorized(error);
      }

      const accessToken = await signAccessToken(isUser._id);
      const refreshToken = await signRefreshToken(isUser._id);
      return res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },
  loginWithGoogle: async (req, res, next) => {
    try {
      const { error } = loginWithGoogleValidate(res.body);

      if (error) {
        throw createError(error.details[0].message);
      }

      const { credential } = req.body;
      const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: this.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const googleUserId = ticket.getUserId();

      if (!payload || !googleUserId) {
        throw createError.NotFound("User not found");
      }

      let user = await UserModel.findOne({
        googleUserId,
      });

      if (!user) {
        user = new UserModel({
          username: payload.email,
          email: payload.email,
          password: credential,
          googleUserId,
          googleUserProfile: payload,
        });
        await user.save();
      }

      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);
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
      const { userId } = await verifyRefreshToken(refreshToken);
      redisClient.del(REDIS_KEY_DEFAULT + userId.toString(), (err) => {
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
      return res.json({ status: true });
    } catch (error) {
      next(error);
    }
  },
};
