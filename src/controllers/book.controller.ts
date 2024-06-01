import {Request, Response} from "express";
import bookService from "../services/book.service.js";
import numberUtil from "../util/number.util.js";

async function uploadBookImage(req: Request, res: Response): Promise<any> {
  if (!req.file || !req.params.lessonId) {
    return res.status(400).send({
      message: "Error: No file found or No lessonId found",
      isSuccessful: false
    })
  }
  try {
    await bookService.uploadImage(req.file, +req.params.lessonId);
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).send({
      message: e.message,
      isSuccessful: false
    });
  }
  return res.status(200).send({
    message: "Image uploaded successfully",
    isSuccessful: true
  });
}

async function uploadMultipleBookImages(req: Request, res: Response): Promise<any> {
  const lessonId = req.params.lessonId;
  if (!numberUtil.isNumberString(lessonId)) {
    return res.status(400).send({
      message: "Error: LessonId must be a number",
      isSuccessful: false
    })
  }

  if (!req.files) {
    return res.status(400).send({
      message: "Error: No files found or No lessonId found",
      isSuccessful: false
    })
  }
  const files = req.files as Express.Multer.File[];
  try {
    await bookService.uploadMultipleImages(files, +lessonId);
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).send({
      message: e.message,
      isSuccessful: false
    });
  }

  return res.status(200).send({
    message: "Images uploaded successfully",
    isSuccessful: true
  });
}

export default {
  uploadBookImage,
  uploadMultipleBookImages
}