const createError = require("http-errors");

const { crmCustomerService } = require("@services/crmCustomer");
const {
  crmCustomerValidate,
  paginationValidate,
} = require("../helpers/validation");

module.exports = {
  deleteByIds: async (req, res, next) => {
    try {
      const { ids } = req.body;

      if (!ids || !ids.length) {
        throw createError("Ids is required");
      }

      const customer = await crmCustomerService.deleteByIds(ids);

      if (!customer) {
        throw createError("Customer not found");
      }

      return res.json({
        status: true,
        message: "Customer deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  },
  getDataById: async (req, res, next) => {
    try {
      const { id } = req.query;

      if (!id) {
        throw createError("Id is required");
      }

      const customer = await crmCustomerService.getDataById(id);

      return res.json({
        status: true,
        data: customer,
      });
    } catch (err) {
      next(err);
    }
  },
  list: async (req, res, next) => {
    try {
      const { error } = paginationValidate(req.query);

      if (error) {
        throw createError(error.details[0].message);
      }

      const { page = 1, limit = 10, sort } = req.query;
      const customers = await crmCustomerService.getList({ page, limit, sort });

      return res.json({
        ...customers,
      });
    } catch (err) {
      next(err);
    }
  },
  register: async (req, res, next) => {
    try {
      const { error } = crmCustomerValidate(req.body);

      if (error) {
        throw createError(error.details[0].message);
      }

      const { email, name, phone, channel } = req.body;

      const createCustomer = await crmCustomerService.create({
        email,
        name,
        phone,
        channel,
      });

      return res.json({
        status: true,
        data: createCustomer,
      });
    } catch (error) {
      next(error);
    }
  },
};
