/* eslint-disable no-console */
const mongoose = require('mongoose');

const conn = mongoose.createConnection(
  process.env.MONGO_URL_CONNECT_1 || 'mongodb://localhost:27017/test',
);

conn.on('connected', () => {
  console.log(`Mongodb is connected with database is:: ${this.name}`);
});
conn.on('disconnected', () => {
  console.log(`Mongodb is disconnected with database is:: ${this.name}`);
});

conn.on('error', (error) => {
  console.log(`Mongodb is error:: ${JSON.stringify(error)}`);
});

process.on('SIGINT', async () => {
  await conn.close();
  process.exit(0);
});

module.exports = conn;
