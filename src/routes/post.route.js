const express = require("express");

const route = express.Router();

const { verifyAccessToken } = require("../helpers/jwt_service");
const controller = require("../controllers/post.controller");


route.get("/news", controller.getListByCustomer);
route.get("/news/:id", controller.getDataById);

route.post("/create", verifyAccessToken, controller.createOrUpdate);
route.post("/update", verifyAccessToken, controller.update);
route.get("/list", verifyAccessToken, controller.list);
route.delete("/move-to-trash", verifyAccessToken, controller.deleteByIds);

route.get("/:id", verifyAccessToken, controller.getDataById);

module.exports = route;
