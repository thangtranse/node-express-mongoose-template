const express = require("express");
const multer = require("multer");

const route = express.Router();

const verifyAccessToken = require("../middlewares/access-token.middleware");
const transportController = require("../controllers/transport.controller");
const upload = require("../configs/multer.config");

route.post(
  "/image",
  verifyAccessToken,
  upload.single("image"),
  transportController.image
);

route.post(
  "/file",
  verifyAccessToken,
  upload.single("file"),
  transportController.file
);

route.post(
  "/fetch",
  verifyAccessToken,
  multer().none(),
  transportController.fetch
);

module.exports = route;
