const createError = require("http-errors");

const {
  crmCustomerValidate,
  paginationValidate,
} = require("../helpers/validation");
const { marketingChannels } = require("../constants/campaigns.const");

const CRMCustomerModel = require("../models/crm-customer.model");

module.exports = {
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
};
