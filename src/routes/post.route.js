const express = require("express");

const route = express.Router();

const { verifyAccessToken } = require("../helpers/jwt_service");
const controller = require("../controllers/post.controller");

route.post("/create", controller.create);
route.post("/update", controller.update);
route.get("/list", verifyAccessToken, controller.list);
route.get("/", verifyAccessToken, controller.getDataById);
route.delete("/move-to-trash", verifyAccessToken, controller.deleteByIds);

module.exports = route;
