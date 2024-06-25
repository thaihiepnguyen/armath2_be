import imageService from "../services/image.service.js";
import {Request, Response} from "express";
import NumberUtil from "../util/number.util.js";


async function uploadImage(req: Request, res: Response): Promise<any> {
  if(!req.file) {
    return res.status(400).send({
      message: "Error: No file found",
      isSuccessful: false
    })
  }
  try {
    await imageService.uploadSingleImage(req.file);
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

async function downloadImage(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send({
      message: "id is required",
      isSuccessful: false
    })
  }

  if (!NumberUtil.isNumberString(id)) {
    return res.status(400).send({
      message: "id must be a number",
      isSuccessful: false
    })
  }

  const image = await imageService.getImageById(+id);
  if (!image) {
    return res.status(404).send({
      message: "Image not found",
      isSuccessful: false
    })
  }

  try {
    res.set('Content-Type', image.type);
    res.set('Content-Disposition', `attachment; filename=${image.name}`);
    res.send(image.data);
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).send({
      message: e.message,
      isSuccessful: false
    });
  }
}

async function uploadMultipleImages(req: Request, res: Response) {
  if(!req.files) {
    return res.status(400).send({
      message: "Error: No files found",
      isSuccessful: false
    })
  }

  const files = req.files as Express.Multer.File[];
  try {
    await imageService.uploadMultipleImages(files);
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
  uploadImage,
  downloadImage,
  uploadMultipleImages
}