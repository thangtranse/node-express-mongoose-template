const express = require("express");
const route = express.Router();

route.post("/register", (req, res, next) => {
  res.send("Post Register");
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
