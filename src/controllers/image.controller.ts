import {ImageEntity} from "../entities/image.entity.js";
import db from "../util/db.js";
import {Request, Response} from "express";


async function uploadImage(req: Request, res: Response): Promise<any> {
  if(!req.file) {
    return res.status(400).send({
      message: "Error: No file found",
      isSuccessful: false
    })
  }

  db<ImageEntity>('images').insert({
    data: req.file.buffer,
    name: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype
  }).then(() => {
    res.status(200).send({
      message: "Image uploaded successfully",
      isSuccessful: true
    })
  }).catch((err: any) => {
    res.status(500).send({
      message: "Error: " + err.message,
      isSuccessful: false
    })
  })
}

async function downloadImage(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const image = await db<ImageEntity>('images').where('image_id', id).first();
  if (!image) {
    return res.status(404).send({
      message: "Image not found",
      isSuccessful: false
    })
  }

  res.set('Content-Type', image.type);
  res.set('Content-Disposition', `attachment; filename=${image.name}`);
  res.send(image.data);
}

export default {
  uploadImage,
  downloadImage
}