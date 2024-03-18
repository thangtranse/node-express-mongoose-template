async function getListDataFromModel(model, { page, limit, sort }) {
  const skip = (page - 1) * limit;
  let sortQuery = [];
  if (sort) {
    sortQuery = sort.split(",").map((item) => {
      const [key, value] = item.split(":");
      return [key, value === "desc" ? -1 : 1];
    });
  }

  // check model is a function
  if (typeof model !== "function") {
    throw new Error("Model is not a function");
  }

  const data = await model.find()
    .skip(skip)
    .limit(parseInt(limit, 10))
    .sort(sortQuery);

  const total = await model.countDocuments();

  return {
    data,
    total,
    currentPage: parseInt(page, 10),
    totalPages: Math.ceil(total / limit),
  };
}

module.exports = { getListDataFromModel };
