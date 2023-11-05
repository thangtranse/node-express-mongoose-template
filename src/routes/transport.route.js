const express = require("express");

const route = express.Router();

const { verifyAccessToken } = require("../helpers/jwt_service");
const transportController = require("../controllers/transport.controller");
const upload = require("../configs/multer.config");

route.post(
  "/image",
  verifyAccessToken,
  upload.single("image"),
  transportController.image
);

route.post("/fetch", verifyAccessToken, transportController.fetch);

module.exports = route;
