const { getFileUrl } = require("../utils/fileUpload");
const { uploadImageService } = require("../services/uploadFile");

module.exports = {
  image: async (request, response) => {
    const { file } = request;
    if (!file) {
      return response.status(400).json({
        success: 0,
        message: "No files found",
      });
    }
    if (file.fieldname !== "image") {
      return response.status(400).json({
        success: 0,
        message: "No images found",
      });
    }
    try {
      await uploadImageService.saveDB(file, request.payload.userId);
      return response.status(200).json({
        success: 1,
        message: "Image uploaded successfully",
        file: {
          url: `${process.env.URL_HOST}/${getFileUrl(file)}`,
        },
      });
    } catch (error) {
      return response.status(500).json({
        success: 0,
        message: error.message,
      });
    }
  },
  fetch: async (request, response) => {
    if (!request.body.imageUrls) {
      return response.status(400).json({
        success: 0,
        message: "No images found",
      });
    }

    const { imageUrls } = request.body;

    try {
      const fileData = await uploadImageService.fetch(
        imageUrls,
        request.payload.userId
      );
      const url = getFileUrl(fileData);

      return response.status(200).json({
        success: 1,
        message: "Image fetched successfully",
        file: {
          url: `http://localhost:7777/${getFileUrl(url)}`,
          name: fileData.name,
          size: fileData.size,
          type: fileData.type,
          mimetype: fileData.mimetype,
        },
      });
    } catch (error) {
      return response.status(500).json({
        success: 0,
        message: error.message,
      });
    }
  },
};
