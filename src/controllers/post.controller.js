const createError = require("http-errors");

const postModel = require("@models/post.model");
const { postService } = require("@services/post");
const { postValidate, paginationValidate } = require("../helpers/validation");

module.exports = {
  createOrUpdate: async (req, res, next) => {
    try {
      const { error } = postValidate(req.body);

      if (error) {
        throw createError(error.details[0].message);
      }

      const createPost = await postModel({
        ...req.body,
        author: req.payload.userId,
      });

      const saveUser = await postModel.updateOne({ _id: createPost._id }, createPost, {
        new: true,
        upsert: true
      });

      return res.json({
        status: true,
        data: saveUser,
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

      const customer = await postService.deleteByIds(ids);
      if (!customer) {
        throw createError("Customer not found");
      }

      return res.json({
        status: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  getDataById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError("Id is required");
      }

      const result = await postService.getDataById(id);

      return res.json({
        status: true,
        data: result,
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
      const data = await postService.getList({ page, limit, sort });

      return res.json({
        ...data,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { error } = postValidate(req.body);

      if (error) {
        throw createError(error.details[0].message);
      }

      const updatePost = await postModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { ...req.body, updatedBy: req.payload.userId },
        {
          new: true,
        }
      );

      if (!updatePost) {
        throw createError.NotFound("Post not found");
      }

      return res.json({
        status: true,
        data: updatePost,
      });
    } catch (error) {
      next(error);
    }
  },

  getListByCustomer: async (req, res, next) => {
    try {
      const { error } = paginationValidate(req.query);
      if (error) {
        throw createError(error.details[0].message);
      }
      const { page = 1, limit = 10, sort } = req.query;
      const data = await postService.getList({ page, limit, sort });
      return res.json({
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }
};
