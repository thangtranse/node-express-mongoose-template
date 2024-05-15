const express = require("express");

const route = express.Router();

const verifyAccessToken = require("../middlewares/access-token.middleware");
const controller = require("../controllers/construction.controller");


route.get("/", controller.list);
route.get("/:id", controller.getDataById);
route.delete("/:id", controller.deleteByIds);
route.post("/", verifyAccessToken, controller.create);

module.exports = route;
