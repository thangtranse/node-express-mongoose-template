const express = require("express");
const route = express.Router();
const healthController = require("../controllers/health.controller");

route.get("/inital-data", healthController.initalData);

module.exports = route;
