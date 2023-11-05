function getFileUrl(fileData) {
  return `/uploads/${fileData.filename}`;
}

module.exports = { getFileUrl };
