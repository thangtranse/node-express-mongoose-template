const express = require("express");

const route = express.Router();

const verifyAccessToken = require("../middlewares/access-token.middleware");
const crmCustomerController = require("../controllers/crm-customer.controller");

route.post("/income", crmCustomerController.register);

route.get("/list", verifyAccessToken, crmCustomerController.list);

route.delete(
  "/move-to-trash",
  verifyAccessToken,
  crmCustomerController.deleteByIds
);

route.get("/", verifyAccessToken, crmCustomerController.getDataById);

module.exports = route;
