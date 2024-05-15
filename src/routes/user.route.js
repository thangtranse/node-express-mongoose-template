const express = require("express");

const route = express.Router();

const verifyAccessToken = require("../middlewares/access-token.middleware");
const userController = require("../controllers/user.controller");

route.post("/register", userController.register);

route.post("/refresh-token", userController.refreshToken);

route.post("/login", userController.login);

route.post("/login-google", userController.loginWithGoogle);

route.delete("/logout", userController.logout);

route.get(
  "/get-list-account",
  verifyAccessToken,
  userController.getListAccount
);

route.get("/test-error-api", userController.testErrorApi);

module.exports = route;
