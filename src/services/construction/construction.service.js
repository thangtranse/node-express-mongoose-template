
const constructionModel = require('../../models/construction.model');
const { getListDataFromModel } = require('../../utils/getListDataFromModel');

module.exports = {
    getList: async ({ page, limit, sort }) =>
        getListDataFromModel(constructionModel, { page, limit, sort }),
    getDataById: async (id) => constructionModel.findById(id),
    deleteByIds: async (ids) => constructionModel.deleteMany({ _id: { $in: ids } }),
    create: async (data) => constructionModel.create(data),
}