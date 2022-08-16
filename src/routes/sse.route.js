const express = require("express");
const route = express.Router();
const sseController = require("../controllers/sse.controller");

route.get("/status", sseController.status);
route.get("/events", sseController.events);
route.post("/facts", sseController.addFact);


module.exports = route;
