/* eslint-disable no-console */
const mongoose = require('mongoose');

function newConnection(uri) {
  const conn = mongoose.createConnection(uri);

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

  return conn;
}

const testConnection = newConnection(process.env.MONGO_URL_CONNECT_1);
const usersDbConnection = newConnection(
  process.env.MONGO_URL_CONNECT_2 || 'mongodb://localhost:27017/test',
);

module.exports = {
  testConnection,
  usersDbConnection,
};
