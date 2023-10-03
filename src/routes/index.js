const express = require("express");
const createError = require("http-errors");

const userRoute = require("./user.route");

module.exports = (app) => {
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.use("/v1/api/user", userRoute);

  app.get("/*", (req, res, next) => {
    next(createError.NotFound());
  });

  app.post("/*", (req, res, next) => {
    next(createError.NotFound());
  });
};
