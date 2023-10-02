/* eslint-disable no-console */
/* eslint-disable new-cap */
const redis = require('ioredis');

const client = new redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || 'localhost',
});

client.ping((err, pong) => {
  console.log(`Redis- ping -> pong:: ${pong}`);
});

client.on('error', (error) => {
  console.log(`Redis is error:: ${error}`);
});

client.on('connected', () => {
  console.log('Redis is connected');
});

client.on('ready', () => {
  console.log('Redis is ready');
});

module.exports = client;
