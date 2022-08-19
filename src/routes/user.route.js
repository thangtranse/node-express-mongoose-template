const express = require("express");
const route = express.Router();
const { veryfyAccessToken } = require("../helpers/jwt_service");
const {
  isRoles,
  isAdminRole,
  isUserRole,
} = require("../helpers/permissions_service");
const userController = require("../controllers/user.controller");

route.post("/register", userController.register);

route.post("/refresh-token", userController.refreshToken);

route.post("/login", userController.login);

route.delete("/logout", userController.logout);

route.get(
  "/get-list-account",
  veryfyAccessToken,
  userController.getListAccount
);

route.get("/test/error-api", userController.testErrorApi);

route.get(
  "/test/admin",
  veryfyAccessToken,
  isRoles,
  isAdminRole,
  (req, res, next) => {
    return res.json({ status: true });
  }
);
route.get(
  "/test/user",
  veryfyAccessToken,
  isRoles,
  isUserRole,
  (req, res, next) => {
    return res.json({ status: true });
  }
);

module.exports = route;
