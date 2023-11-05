const { getFileUrl } = require("../utils/fileUpload");
const { uploadImageService } = require("../services/uploadFile");

module.exports = {
  image: async (request, response) => {
    if (!request.file) {
      return response.status(400).json({
        success: 0,
        message: "No files found",
      });
    }
    if (request.file.fieldname !== "image") {
      return response.status(400).json({
        success: 0,
        message: "No images found",
      });
    }
    try {
      await uploadImageService.image(request.file, request.payload.userId);
      return response.status(200).json({
        success: 1,
        message: "Image uploaded successfully",
        imageUrl: getFileUrl(request.file),
      });
    } catch (error) {
      return response.status(500).json({
        success: 0,
        message: error.message,
      });
    }
  },
  fetch: () => {},
};
