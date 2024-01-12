const response = require("../services/response.service");
const FileService = require("../services/file.service");

class FileController {
  constructor() {
    // Bind the methods to the instance's context
    this.uploadImage = this.uploadImage.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.deleteImages = this.deleteImages.bind(this);
    this.editImage = this.editImage.bind(this);
    this.editImages = this.editImages.bind(this);
  }

  // Helper function to handle the response
  handleResponse(res, promise) {
    promise
      .then((result) => response.success(res, undefined, result))
      .catch((err) => response.internal(res, undefined, err));
  }

  // UPLOAD NEW SINGLE IMAGE
  uploadImage(req, res) {
    this.handleResponse(res, FileService.uploadImage(req?.file));
  }

  // UPLOAD NEW MULTIPLE IMAGES
  uploadImages(req, res) {
    this.handleResponse(res, FileService.uploadImages(req?.files));
  }

  // DELETE SINGLE IMAGE
  deleteImage(req, res) {
    this.handleResponse(res, FileService.deleteImage(req?.body?.id));
  }

  // DELETE MULTIPLE IMAGES
  deleteImages(req, res) {
    this.handleResponse(res, FileService.deleteImages(req?.body?.id));
  }

  // EDIT SINGLE IMAGE
  editImage(req, res) {
    this.handleResponse(res, FileService.editImage(req?.file, req?.body?.id));
  }

  // EDIT MULTIPLE IMAGES
  editImages(req, res) {
    this.handleResponse(res, FileService.editImages(req?.files, req?.body?.id));
  }
}

module.exports = new FileController();
