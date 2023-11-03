const express = require("express");
const createError = require("http-errors");

const userRoute = require("./user.route");
const CRMCustomerRoute = require("./crm-customer.route");

module.exports = (app) => {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/crm", CRMCustomerRoute);

  app.get("/*", (req, res, next) => {
    next(createError.NotFound());
  });

  app.post("/*", (req, res, next) => {
    next(createError.NotFound());
  });
};
