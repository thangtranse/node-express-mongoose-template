/* eslint-disable func-names */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const softDeletePlugin = require("./plugins/soft-delete.plugin");
const dbConnected = require("../databases/connection.mongodb");

const PostDictionary = {
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: false,
  },
  content: {
    type: Object,
  },
}

const schema = new Schema(
  {
    ...PostDictionary,
    renderType: {
      type: String,
      enum: ["editorJs", "html"],
      default: "editorJs",
    },
    imagesProfile: {
      type: Array,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    draft: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    multilingual: {
      en: PostDictionary,
    }
  },
  { timestamps: true }
);

schema.index({ draft: 1, author: 1 });
schema.index({ draft: 1, title: 1 });
schema.index({ draft: 1, tags: 1 });

schema.plugin(softDeletePlugin);

module.exports = dbConnected.model("posts", schema);
