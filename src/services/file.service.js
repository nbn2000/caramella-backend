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
const db = require("../config.mongodb");
const images = db.collection("images");
const crypto = require("crypto");

const app = initializeApp(firebaseConfig);
const storage = getStorage();

class FileService {
  // Helper function to insert docs to mongodb
  async uploadImagesToM(downloadURL) {
    const id = crypto.randomBytes(8).toString("hex");
    await images.insertOne({
      id,
      url: downloadURL,
    });
    return id;
  }
  // Helper function to insert docs to mongodb
  async deleteImageFromM(id) {
    const URLS = await images.findOne({ id });
    await images.deleteOne({ id });
    return URLS?.url;
  }

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
    const downloadURL = await this.resizeAndUploadImage(file);
    const id = await this.uploadImagesToM(Array(downloadURL));
    return { id, url: downloadURL };
  }

  // UPLOAD NEW MULTIPLE IMAGES
  async uploadImages(files) {
    const uploadTasks =
      files?.map((file) => this.resizeAndUploadImage(file)) || [];
    const downloadURLs = await Promise.all(uploadTasks);
    const id = await this.uploadImagesToM(downloadURLs);
    return { id, url: downloadURLs };
  }

  // DELETE SINGLE IMAGE
  async deleteImage(id) {
    const urls = await this.deleteImageFromM(id);
    if (urls && urls.length > 0) {
      const fileRef = ref(storage, urls[0]);
      await deleteObject(fileRef);
      return "File deleted successfully";
    } else {
      throw new Error("Image not found in database");
    }
  }

  // DELETE MULTIPLE IMAGES
  async deleteImages(id) {
    const urls = await this.deleteImageFromM(id);
    if (urls && urls.length > 0) {
      const deleteTasks = urls.map((cdnURL) => {
        const fileRef = ref(storage, cdnURL);
        return deleteObject(fileRef);
      });
      await Promise.all(deleteTasks);
      return { message: "Files deleted successfully" };
    } else {
      throw new Error("Image not found in database");
    }
  }

  // EDIT SINGLE IMAGE
  async editImage(file, id) {
    if (id === undefined || id === null) {
      return this.uploadImage(file);
    } else {
      await this.deleteImage(id);
      return this.uploadImage(file);
    }
  }

  // EDIT MULTIPLE IMAGES
  async editImages(files, id) {
    if (id === undefined || id === null) {
      return this.uploadImages(files);
    } else {
      await this.deleteImages(id);
      return this.uploadImages(files);
    }
  }
}

module.exports = new FileService();
