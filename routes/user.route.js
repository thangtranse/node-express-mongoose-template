const express = require("express");
const route = express.Router();
const createError = require("http-errors");

const { userValidate } = require("../helpers/validation");
const { signAccessToken } = require("../helpers/jwt_service");

const UserModel = require("../models/user.model");

route.post("/register", async (req, res, next) => {
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
    });

    const saveUser = await user.save();

    return res.json({
      status: true,
      data: saveUser,
    });
  } catch (error) {
    next(error);
  }
});

route.post("/refresh-token", (req, res, next) => {
  res.send("Post refresh token");
});

route.post("/login", async (req, res, next) => {
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
    return res.json(accessToken);
  } catch (error) {
    next(error);
  }
});

route.get("/logout", (req, res, next) => {
  res.send("Get Logout");
});

module.exports = route;
