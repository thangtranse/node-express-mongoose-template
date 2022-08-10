const express = require("express");
const route = express.Router();
const createError = require("http-errors");

const UserModel = require("../models/user.model");

route.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createError.BadRequest();
    }
    const isExits = await UserModel.findOne({
      username: email,
    });
    if (isExits) {
      throw createError.Conflict(`${email} is ready been register`);
    }
    const isCreate = await UserModel.create({
      username: email,
      password: password,
    });
    return res.json({
      status: true,
      data: isCreate,
    });
  } catch (error) {
    next(error);
  }
});

route.post("/refresh-token", (req, res, next) => {
  res.send("Post refresh token");
});

route.post("/login", (req, res, next) => {
  res.send("Post Login");
});

route.get("/logout", (req, res, next) => {
  res.send("Get Logout");
});

module.exports = route;
