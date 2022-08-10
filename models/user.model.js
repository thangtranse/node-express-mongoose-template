const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbConnected = require("../datasources/connection.mongodb");
// const { testConnection } = require("../helpers/connection.multi.mongodb");

const userSchema = new Schema({
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
});

// module.exports = {
//   userTestModel: testConnection.model("user", userSchema),
//   userUsersModel: usersDbConnection.model("user", userSchema),
// };

module.exports = dbConnected.model("users", userSchema);
