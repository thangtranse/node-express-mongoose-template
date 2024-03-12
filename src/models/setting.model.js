/* eslint-disable func-names */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const softDeletePlugin = require("./plugins/soft-delete.plugin");
const dbConnected = require("../databases/connection.mongodb");

const schema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    setting: {
      type: Object,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    draft: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

schema.index({ key: 1 });
schema.plugin(softDeletePlugin);

module.exports = dbConnected.model("setting", schema);
