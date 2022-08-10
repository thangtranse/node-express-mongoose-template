const redis = require("redis");

const client = redis.createClient({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || "localhost",
});

client.ping((err, pong) => {
  console.log(`redis ping -> pong:: ${pong}`);
});

module.exports = client;
