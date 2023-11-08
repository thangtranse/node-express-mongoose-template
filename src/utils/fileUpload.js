const crypto = require("crypto");
const bufferType = require("buffer-type");
const fs = require("fs");
const multer = require("../configs/multer.config");

function getFileUrl(fileData) {
  return `/uploads/${fileData.filename}`;
}

async function saveFileToLocal(data, mimetype, possibleExtension) {
  const filename = await crypto.randomBytes(16).toString("hex");
  const type = await bufferType(data);
  const ext = type ? type.extension : possibleExtension;
  const fullName = `${filename}${ext}`;

  fs.writeFileSync(`${multer.FILE_PATH}/${fullName}`, data);

  return {
    name: fullName,
    filename: fullName,
    size: data.length,
    mimetype,
  };
}

module.exports = { getFileUrl, saveFileToLocal };
