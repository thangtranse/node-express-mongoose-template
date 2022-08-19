const {
  roles: { scope, scopeDefault, scopeAdmin },
} = require("../configs/database.config");
const createError = require("http-errors");
const UserModel = require("../models/user.model");

async function isRoles(req, res, next) {
  try {
    const { payload } = req;
    const checkExs = await UserModel.findById(payload.userId);
    req.payload = {
      ...payload,
      roles: checkExs.roles,
    };
    return next();
  } catch (error) {
    console.log("Error isRoles::", error);
    return next(createError.Unauthorized());
  }
}

async function isAdminRole({ payload: { roles } }, res, next) {
  try {
    if (roles.indexOf(scopeAdmin.toLowerCase()) !== -1) {
      return next();
    }
    throw "Unauthorized";
  } catch (error) {
    console.log("Error isAdminRole::", error);
    return next(createError.Unauthorized());
  }
}

async function isUserRole({ payload: { roles } }, res, next) {
  try {
    if (roles.indexOf(scopeDefault.toLowerCase()) !== -1) {
      return next();
    }
    throw "Unauthorized";
  } catch (error) {
    console.log("Error isUserRole::", error);
    return next(createError.Unauthorized());
  }
}

module.exports = {
  isRoles,
  isAdminRole,
  isUserRole,
};
