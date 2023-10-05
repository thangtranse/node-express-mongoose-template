const createError = require("http-errors");

const {
  crmCustomerValidate,
  paginationValidate,
} = require("../helpers/validation");
const { marketingChannels } = require("../constants/campaigns.const");

const CRMCustomerModel = require("../models/crm-customer.model");

module.exports = {
  deleteById: async (req, res, next) => {
    try {
      const { id } = req.query;

      if (!id) {
        throw createError("Id is required");
      }

      const customer = await CRMCustomerModel.softDelete({ _id: id });

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
  deleteByIds: async (req, res, next) => {
    try {
      const { ids } = req.body;

      if (!ids || !ids.length) {
        throw createError("Ids is required");
      }

      const customer = await CRMCustomerModel.softDelete({ _id: ids });

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

      const customer = await CRMCustomerModel.findOne({ _id: id });

      if (!customer) {
        throw createError("Customer not found");
      }

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
      const skip = (page - 1) * limit;
      let sortQuery = [];
      if (sort) {
        sortQuery = sort.split(",").map((item) => {
          const [key, value] = item.split(":");
          return [key, value === "desc" ? -1 : 1];
        });
      }
      const customers = await CRMCustomerModel.find()
        .skip(skip)
        .limit(parseInt(limit, 10))
        .sort(sortQuery);
      const totalCustomers = await CRMCustomerModel.countDocuments();

      return res.json({
        customers,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalCustomers / limit),
        totalCustomers,
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
      const customer = new CRMCustomerModel({
        name,
        email,
        phone,
        channel: channel || marketingChannels.website,
      });

      const saveUser = await customer.save();

      return res.json({
        status: true,
        data: saveUser,
      });
    } catch (error) {
      next(error);
    }
  },
};
