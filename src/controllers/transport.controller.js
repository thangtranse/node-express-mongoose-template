const { getFileUrl } = require("../utils/fileUpload");
const { uploadService } = require("../services/uploadFile");

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
      await uploadService.saveDB(file, request.payload.userId);
      return response.status(200).json({
        status: true, // default app
        success: 1,
        message: "Image uploaded successfully",
        file: {
          url: `${process.env.URL_HOST}/${getFileUrl(file)}`,
          baseUrl: getFileUrl(file),
        },
      });
    } catch (error) {
      return response.status(500).json({
        success: 0,
        message: error.message,
      });
    }
  },
  file: async (request, response) => {
    const { file, body, payload } = request;
    // Check if a file was uploaded
    if (!file) {
      return response.status(400).json({
        success: 0,
        message: "No files found",
      });
    }

    try {
      const fileExtension = file.mimetype ? file.mimetype : null;
      if (fileExtension !== 'application/pdf') {
        return response.status(400).json({
          success: 0,
          message: "No PDF file found",
        });
      }

      await uploadService.saveDB(file, payload.userId, body)

      return response.status(200).json({
        status: true, // default app
        success: 1,
        message: "File uploaded successfully",
        file: {
          url: `${process.env.URL_HOST}/${getFileUrl(file)}`,
          baseUrl: getFileUrl(file),
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
      const fileData = await uploadService.fetch(
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
