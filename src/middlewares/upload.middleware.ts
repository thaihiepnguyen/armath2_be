import multer from "multer";
import path from "path";
import fs from "node:fs";


const storage = (folder: string) => multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `dist/images/${folder}`);
  },
  filename: (req, file, callback) => {
    callback(null, 'dummy' + path.extname(file.originalname));
  }
})
const userUpload = multer({storage: storage("users")});
const bookUpload = multer({storage: storage("books")});

export default {
  userUploadMiddleware: userUpload.single("img"),
  bookUploadMiddleware: bookUpload.single("img")
}