const express = require("express");

const route = express.Router();

const controller = require("../controllers/static-file.controller");

route.get("/type/:actionType", controller.getFileByActionTypeWhereLastUploaded);

module.exports = route;
