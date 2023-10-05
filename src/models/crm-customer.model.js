const mongoose = require("mongoose");

const dbConnected = require("../databases/connection.mongodb");
const { marketingChannels } = require("../constants/campaigns.const");

const { Schema } = mongoose;

const schema = new Schema(
  {
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      default: null,
    },
    channel: {
      type: String,
      enum: Object.values(marketingChannels),
      default: marketingChannels.unknown,
    },
  },
  { timestamps: true }
);

schema.index({ campaign: 1 });

schema.index({ uploadedBy: 1 });

module.exports = dbConnected.model("crm-customers", schema);
