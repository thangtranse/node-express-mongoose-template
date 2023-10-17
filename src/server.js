require("module-alias/register");
require("dotenv").config();

const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const helmetConfig = require("./configs/helmet.config");
const corsConfig = require("./configs/cors.config");

const app = express();

app.use(cors(corsConfig));
app.use(compression());
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

// Mongodb
require("./databases/connection.mongodb");
// require("./databases/connection.multi.mongodb");

// Redis
require("./databases/connection.redis");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Routes
require("./routes/index")(app);

app.use((err, req, res, _next) => {
  logEvents({
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
    msg: err.message,
  });

  res.json({
    status: false,
    errorCode: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${PORT}`);
});
