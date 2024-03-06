const path = require("path");

const { uploadService } = require("../services/uploadFile");


module.exports = {
  getFileByActionTypeWhereLastUploaded: async (req, res, next) => {
    try {
      const { actionType } = req.params;
      // Check if actionType is not valid
      if (!actionType) {
        return res.status(400).json({
          success: 0,
          message: "Invalid type",
        });
      }
      const getFile = await uploadService.getFileByActionTypeWhereLastUploaded(actionType);
      if (!getFile || !getFile?.file) {
        return res.status(404).json({
          success: 0,
          message: "File not found",
        });
      }
      const { file } = getFile;
      const { path: filePath } = file;
      return res.download(path.join(__dirname, `../../public${filePath}`));
    } catch (error) {
      next(error);
    }
  },
};
