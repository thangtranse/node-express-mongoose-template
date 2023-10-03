/* eslint-disable no-console */
const mongoose = require("mongoose");

const MONGO_URL =
  process.env.MONGO_URL_CONNECT_1 || "mongodb://localhost:27017/test";

const connection = mongoose.createConnection(MONGO_URL);

connection.on("connected", () => {
  console.log(`Mongodb is connected with database is:: ${connection.name}`);
});

connection.on("disconnected", () => {
  console.log(`Mongodb is disconnected with database is:: ${connection.name}`);
});

connection.on("error", (error) => {
  console.log(
    `Mongodb is error:: ${JSON.stringify(
      { error, connectionUrl: MONGO_URL },
      null,
      2
    )}`
  );
});

process.on("SIGINT", async () => {
  await connection.close();
  process.exit(0);
});

module.exports = connection;
