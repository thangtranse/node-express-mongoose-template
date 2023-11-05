const UploadModel = require("@models/upload.model");

const { getFileUrl } = require("../../utils/fileUpload");

module.exports = {
  image: (file, uploadedByUserId) => {
    const upload = new UploadModel({
      ...file,
      path: getFileUrl(file),
      uploadedBy: uploadedByUserId,
    });
    return upload.save();
  },
};
