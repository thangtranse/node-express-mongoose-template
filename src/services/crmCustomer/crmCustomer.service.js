const CRMCustomerModel = require("@models/crm-customer.model");
const { marketingChannels } = require("@constants/campaigns.const");

module.exports = {
  create: ({ email, name, phone, channel }) => {
    const customer = new CRMCustomerModel({
      name,
      email,
      phone,
      channel: channel || marketingChannels.website,
    });
    return customer.save();
  },
  deleteById: (customerId) => CRMCustomerModel.softDelete({ _id: customerId }),
  deleteByIds: (customerIds) =>
    CRMCustomerModel.softDelete({ _id: [...customerIds] }),
  getDataById: (customerId) => CRMCustomerModel.findOne({ _id: customerId }),
  getList: async ({ page, limit, sort }) => {
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

    return {
      customers,
      totalCustomers,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalCustomers / limit),
    };
  },
};
