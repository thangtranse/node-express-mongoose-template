const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbConnected = require("../datasources/connection.mongodb");

const CONFIG = require("../configs/database.config");

const rolesSchema = new Schema(
  {
    scope: {
      type: String,
      enum: CONFIG.roles.scope,
      required: true,
    },
    description: {
      type: String,
    },
    name: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

rolesSchema.pre("save", async function (next) {
  try {
    console.log("Called before save::");
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = dbConnected.model("roles", rolesSchema);
