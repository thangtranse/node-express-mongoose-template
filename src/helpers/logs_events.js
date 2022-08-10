const fs = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");

const FILE_NAME = path.join(__dirname, "../../logs", "log.log");

const logEvents = async ({ url, method, headers, body, msg, ...props }) => {
  const dateLog = `${format(new Date(), `dd-mm-yyyy\thh:mm:ss`)}`;
  const contentLog = `${dateLog}------${JSON.stringify({
    url,
    method,
    headers,
    body,
    msg,
    ...props,
  })}\n`;
  try {
    fs.appendFile(FILE_NAME, contentLog);
  } catch (error) {
    console.log(`Error:: ${error}`);
  }
};

module.exports = logEvents;
