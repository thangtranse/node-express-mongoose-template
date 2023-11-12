const postModel = require("@models/post.model");

module.exports = {
  deleteById: (id) => postModel.softDelete({ _id: id }),
  deleteByIds: (ids) => postModel.softDelete({ _id: [...ids] }),
  getList: async ({ page, limit, sort }) => {
    const skip = (page - 1) * limit;
    let sortQuery = [];
    if (sort) {
      sortQuery = sort.split(",").map((item) => {
        const [key, value] = item.split(":");
        return [key, value === "desc" ? -1 : 1];
      });
    }

    const data = await postModel
      .find()
      .skip(skip)
      .limit(parseInt(limit, 10))
      .sort(sortQuery);
    const total = await postModel.countDocuments();

    return {
      data,
      total,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(total / limit),
    };
  },
  getDataById: (id) => postModel.findOne({ _id: id }),
};
