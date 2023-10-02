const express = require('express');

const route = express.Router();
const { verifyAccessToken } = require('../helpers/jwt_service');
const userController = require('../controllers/user.controller');

route.post('/register', userController.register);

route.post('/refresh-token', userController.refreshToken);

route.post('/login', userController.login);

route.delete('/logout', userController.logout);

route.get(
  '/get-list-account',
  verifyAccessToken,
  userController.getListAccount,
);

route.get(
  '/test-error-api',
  userController.testErrorApi,
);

module.exports = route;
