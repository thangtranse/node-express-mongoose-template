const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbConnected = require("../datasources/connection.mongodb");
// const { testConnection } = require("../helpers/connection.multi.mongodb");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unquie: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// module.exports = {
//   userTestModel: testConnection.model("user", userSchema),
//   userUsersModel: usersDbConnection.model("user", userSchema),
// };

// middleware mongo method save
userSchema.pre("save", async function (next) {
  try {
    console.log("Called before save::", this.username, this.password);
    // băm mật khẩu + với 1 chút muối!, càng nhiều muối càng khó dò mã
    // số càng cao ứng dụng chạy càng lâu
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
};

module.exports = dbConnected.model("users", userSchema);
