const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const sharp = require("sharp");
const firebaseConfig = require("../config.firebase");

const app = initializeApp(firebaseConfig);
const storage = getStorage();

class FileService {
  // Helper function to resize and upload a single image
  async resizeAndUploadImage(file) {
    const { buffer, originalname, mimetype } = file;
    const resizedImageBuffer = await sharp(buffer).toBuffer();
    const storageRef = ref(storage, `files/caramella-${originalname}`);
    const metaData = { contentType: mimetype };

    const snapshot = await uploadBytesResumable(
      storageRef,
      resizedImageBuffer,
      metaData
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  // UPLOAD NEW SINGLE IMAGE
  async uploadImage(file) {
    if (file === undefined || file === null) {
      return "file is not found";
    } else {
      const downloadURL = await this.resizeAndUploadImage(file);
      return downloadURL;
    }
  }

  // UPLOAD NEW MULTIPLE IMAGES
  async uploadImages(files) {
    if (files === undefined || files === null) {
      return "file is not found";
    } else {
      const uploadTasks =
        files?.map((file) => this.resizeAndUploadImage(file)) || [];
      const downloadURLs = await Promise.all(uploadTasks);
      return downloadURLs;
    }
  }

  // DELETE SINGLE IMAGE
  async deleteImage(url) {
    if (url === undefined || url === null) {
      return "File not found";
    } else {
      const fileRef = ref(storage, url);
      await deleteObject(fileRef);
      return "File deleted successfully";
    }
  }

  // DELETE MULTIPLE IMAGES
  async deleteImages(url) {
    if (url === undefined || url === null) {
      return "File not found";
    } else {
      const deleteTasks = url.map((cdnURL) => {
        const fileRef = ref(storage, cdnURL);
        return deleteObject(fileRef);
      });
      await Promise.all(deleteTasks);
      return "Files deleted successfully";
    }
  }

  // EDIT SINGLE IMAGE
  async editImage(file, url) {
    if (file === null || file === undefined) {
      return "file is not found";
    } else {
      if (url === undefined || url === null) {
        return this.uploadImage(file);
      } else {
        await this.deleteImage(url);
        return this.uploadImage(file);
      }
    }
  }

  // EDIT MULTIPLE IMAGES
  async editImages(files, url) {
    if (files === undefined || files === null) {
      return "file is not found";
    } else {
      if (url === undefined || url === null) {
        return this.uploadImages(files);
      } else {
        await this.deleteImages(url);
        return this.uploadImages(files);
      }
    }
  }
}

module.exports = new FileService();
