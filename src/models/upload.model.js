const mongoose = require("mongoose");

const dbConnected = require("../databases/connection.mongodb");

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
      required: false,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

fileSchema.index({ uploadedBy: 1 });

module.exports = dbConnected.model("UploadFiles", fileSchema);
