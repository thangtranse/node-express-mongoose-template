const express = require("express");
const createError = require("http-errors");

const userRoute = require("./user.route");
const crmCustomerRoute = require("./crm-customer.route");
const transportRoute = require("./transport.route");
const postRoute = require("./post.route");
const staticFileRoute = require("./static-file.route");

module.exports = (app) => {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/crm", crmCustomerRoute);
  app.use("/api/v1/transport", transportRoute);
  app.use("/api/v1/post", postRoute);
  app.use("/api/v1/static-file", staticFileRoute);

  app.get("/*", (req, res, next) => {
    next(createError.NotFound());
  });

  app.post("/*", (req, res, next) => {
    next(createError.NotFound());
  });
};
