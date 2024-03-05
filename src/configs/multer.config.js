const multer = require("multer");
const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../../public/uploads/");
const MIME_TO_FORMAT = {
  "text/html": "html",
  "text/css": "css",
  "text/javascript": "js",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "audio/mpeg": "mp3",
  "audio/ogg": "ogg",
  "video/mp4": "mp4",
  "application/pdf": "pdf",
  "application/xml": "xml",
  "application/json": "json",
};

if (!fs.existsSync(FILE_PATH)) {
  fs.mkdirSync(FILE_PATH);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, FILE_PATH);
  },
  async filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${MIME_TO_FORMAT[file.mimetype]}`
    );
  },
});

const fileFilter = (request, file, callback) => {
  const acceptedFileTypes = Object.keys(MIME_TO_FORMAT);
  return acceptedFileTypes.includes(file.mimetype)
    ? callback(null, true)
    : callback(null, false);
};

const uploadMulter = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
    fieldSize: 1024 * 1024 * 5, // 5MB
  },
});

module.exports = uploadMulter;
module.exports.FILE_PATH = FILE_PATH;
