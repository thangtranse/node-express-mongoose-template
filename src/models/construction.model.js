/* eslint-disable func-names */
const mongoose = require("mongoose");

const dbConnected = require("../databases/connection.mongodb");

const softDeletePlugin = require("./plugins/soft-delete.plugin");

const { Schema } = mongoose;

const schema = new Schema(
  {
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
    productUsed: {
      type: String,
      default: null,
    },
    gallery: [
      {
        id: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          default: null,
        },
      }
    ]
  },
  { timestamps: true }
);

schema.index({ title: 1 });
schema.index({ uploadedBy: 1 });

schema.plugin(softDeletePlugin);

module.exports = dbConnected.model("construction", schema);
