const express = require("express");

const route = express.Router();

const { verifyAccessToken } = require("../helpers/jwt_service");
const controller = require("../controllers/construction.controller");


route.get("/", controller.list);
route.get("/:id", verifyAccessToken, controller.getDataById);
route.post("/", verifyAccessToken, controller.create);

module.exports = route;
