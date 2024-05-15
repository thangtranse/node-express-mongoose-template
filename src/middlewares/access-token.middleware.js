const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return next(createError.Unauthorized());
    }
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    if (process.env.APP_ADMIN_TOKEN && token === process.env.APP_ADMIN_TOKEN) {
        req.payload = { userId: "supper-admin" };
        return next();
    }

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            if (err.name) {
                switch (err.name) {
                    case "TokenExpiredError":
                        break;
                    case "JsonWebTokenError":
                        return next(createError.Unauthorized());
                    case "NotBeforeError":
                        break;
                    default:
                        break;
                }
            }
            return next(createError.Unauthorized(err.message));
        }
        req.payload = payload;
        next();
    });
};
