const createError = require("http-errors");

const { constructionService } = require("@services/construction");
const {
  constructionValidate,
  paginationValidate,
} = require("../helpers/validation");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { error } = constructionValidate(req.body);

      if (error) {
        throw createError(error.details[0].message);
      }

      const { title, name, address, productUsed, gallery, ...props } = req.body;

      const createCustomer = await constructionService.create({
        title, name, address, productUsed, gallery, ...props
      });

      return res.json({
        status: true,
        data: createCustomer,
      });
    } catch (error) {
      next(error);
    }
  },
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

      const construction = await constructionService.getDataById(id);

      return res.json({
        status: true,
        data: construction,
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
      const constructions = await constructionService.getList({ page, limit, sort });

      return res.json({
        ...constructions,
      });
    } catch (err) {
      next(err);
    }
  },
};
