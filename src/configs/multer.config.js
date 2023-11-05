const multer = require("multer");
const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../../public/uploads/");

if (!fs.existsSync(FILE_PATH)) {
  fs.mkdirSync(FILE_PATH);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, FILE_PATH);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

const fileFilter = (request, file, callback) => {
  const acceptedFileTypes = ["image/jpeg", "image/png"];
  return acceptedFileTypes.includes(file.mimetype)
    ? callback(null, true)
    : callback(null, false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
    fieldSize: 1024 * 1024 * 5, // 5MB
  },
});

module.exports = upload;
