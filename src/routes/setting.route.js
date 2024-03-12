const express = require("express");

const route = express.Router();

const { verifyAccessToken } = require("../helpers/jwt_service");
const controller = require("../controllers/setting.controller");

route.get("/configuration/:key", controller.websiteConfiguration);
route.post("/configuration", verifyAccessToken, controller.modifyConfiguration);

module.exports = route;
