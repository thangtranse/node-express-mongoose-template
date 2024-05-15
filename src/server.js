require("module-alias/register");
require("dotenv").config();

const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");

const i18nextMiddleware = require('i18next-http-middleware');
const helmet = require("helmet");
const path = require("path");

const i18next = require('./configs/i18n.config');
const helmetConfig = require("./configs/helmet.config");
const corsConfig = require("./configs/cors.config");

const languageMiddleware = require('./middlewares/language.middleware');

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
app.use(i18nextMiddleware.handle(i18next));
app.use(languageMiddleware);

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
app.use(express.static(path.join(__dirname, "../public")));
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
