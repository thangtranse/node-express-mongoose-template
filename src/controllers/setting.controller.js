const createError = require("http-errors");

const settingModel = require("@models/setting.model");

module.exports = {
  websiteConfiguration: async (req, res, next) => {
    try {
      const key = req.params?.key;
      if (!key) {
        throw createError("Key is required");
      }
      const websiteContact = await settingModel.findOne({ key });
      return res.json({
        status: true,
        data: websiteContact?.setting || {},
      });
    } catch (error) {
      next(error);
    }
  },
  modifyConfiguration: async (req, res, next) => {
    try {
      const { id, setting } = req.body;
      if (!id || !setting) {
        throw createError("Id and Settings are required");
      }

      const updateOrCreate = await settingModel.updateOne(
        { key: id },
        { $set: { setting } },
        { upsert: true }
      );

      return res.json({
        status: true,
        data: updateOrCreate,
      });
    } catch (error) {
      next(error);
    }
  },
};
