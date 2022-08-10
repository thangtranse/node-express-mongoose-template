require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const helmetConfig = require("./configs/helmet.config");
const app = express();

app.use(morgan("common"));
app.use(
  helmet({
    ...helmetConfig.default,
    contentSecurityPolicy: {
      ...helmetConfig.default.contentSecurityPolicy,
      directives: {
        ...helmetConfig.default.contentSecurityPolicy.directives,
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      },
    },
  })
);

const logEvents = require("./helpers/logs_events");
const userRoute = require("./routes/user.route");
// require("./helpers/connection.mongodb");
require("./datasources/connection.redis");

const createError = require("http-errors");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res, next) => {
  res.send("Hello World");
});
app.use("/v1/api/user", userRoute);

app.get("/*", (req, res, next) => {
  next(createError.NotFound());
});
app.post("/*", (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  logEvents({
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
    msg: err.message,
  });
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
