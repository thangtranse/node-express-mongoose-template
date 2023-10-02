const redis = require("ioredis");

const client = new redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || "localhost",
});

client.ping((err, pong) => {
  console.log(`Redis- ping -> pong:: ${pong}`);
});

client.on("error", function (error) {
  console.log(`Redis is error:: ${error}`);
});

client.on("connected", function () {
  console.log(`Redis is connected`);
});

client.on("ready", function (data) {
  console.log(`Redis is ready`);
});

module.exports = client;
