const nodePath = require("path");
const axios = require("axios");

const UploadModel = require("@models/upload.model");

const { getFileUrl, saveFileToLocal } = require("../../utils/fileUpload");

module.exports = {
  image: (file, uploadedByUserId) => {
    const upload = new UploadModel({
      ...file,
      path: getFileUrl(file),
      uploadedBy: uploadedByUserId,
    });
    return upload.save();
  },
  fetch: async (imageUrls, uploadedByUserId) => {
    const fetchedFile = await axios.get(imageUrls, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(fetchedFile.data, "binary");
    const fetchedContentType = fetchedFile.headers.get("content-type");
    const fetchedMimeType = fetchedContentType || undefined;

    const fileData = await saveFileToLocal(
      buffer,
      fetchedMimeType,
      nodePath.extname(imageUrls).slice(1)
    );

    const upload = new UploadModel({
      ...fileData,
      path: getFileUrl(fileData),
      uploadedBy: uploadedByUserId,
    });

    return upload.save();
  },
};
