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
  fieldSize: 5 * 1024 * 1024, // 5MB
  fileSize: 5 * 1024 * 1024, // 5MB
});

const upload = multer({ storage });

export default upload;
