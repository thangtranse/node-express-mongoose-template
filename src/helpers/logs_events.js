const fs = require("fs");
const path = require("path");
const { format } = require("date-fns");

const FILE_PATH_LOG = path.join(__dirname, "../../logs");

if (!fs.existsSync(FILE_PATH_LOG)) {
  fs.mkdirSync(FILE_PATH_LOG);
}

const FILE_PATH_NAME = path.join(__dirname, "../../logs", "log.log");

if (!fs.existsSync(FILE_PATH_NAME)) {
  fs.appendFile(
    FILE_PATH_NAME,
    `CREATE:: ${new Date().toISOString()}`,
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
}

const logEvents = async ({ url, method, headers, body, msg, ...props }) => {
  const dateLog = `${format(new Date(), "dd-mm-yyyy\thh:mm:ss")}`;
  const contentLog = `${dateLog}------${JSON.stringify({
    url,
    method,
    headers,
    body,
    msg,
    ...props,
  })}\n`;

  fs.appendFile(FILE_PATH_NAME, contentLog);
};

module.exports = logEvents;
