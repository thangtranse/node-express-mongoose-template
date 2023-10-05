/* eslint-disable func-names */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const bcrypt = require("bcrypt");
const dbConnected = require("../databases/connection.mongodb");
// const { testConnection } = require("../helpers/connection.multi.mongodb");

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isSetPassword: {
      type: Boolean,
      default: false,
    },
    googleUserId: {
      type: String,
      default: null,
    },
    googleUserProfile: {
      type: Object,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.index({ username: 1, email: 1 });

// module.exports = {
//   userTestModel: testConnection.model("user", userSchema),
//   userUsersModel: usersDbConnection.model("user", userSchema),
// };

// middleware mongo method save
userSchema.pre("save", async function (next, _options) {
  try {
    // băm mật khẩu + với 1 chút muối!, càng nhiều salt càng khó dò mã
    // số càng cao ứng dụng chạy càng lâu
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.index({ username: 1, email: 1 });
userSchema.index({ googleUserId: 1 });

userSchema.methods.isCheckPassword = (password) =>
  bcrypt.compare(password, this.password);

module.exports = dbConnected.model("users", userSchema);
