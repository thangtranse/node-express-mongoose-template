const express = require("express");

const route = express.Router();

// const { verifyAccessToken } = require("../helpers/jwt_service");
const crmCustomerController = require("../controllers/crm-customer.controller");

route.post("/income", crmCustomerController.register);

route.get("/list", crmCustomerController.list);

route.delete("/", crmCustomerController.deleteById);

route.delete("/move-to-trash", crmCustomerController.deleteByIds);

route.get("/", crmCustomerController.getDataById);

module.exports = route;
