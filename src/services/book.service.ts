import db from "../util/db.js";
import {ImageEntity} from "../entities/image.entity.js";

async function uploadImage(file: Express.Multer.File, lessonId: number): Promise<void> {
  const newImage = await db<ImageEntity>('images').insert({
    data: file.buffer,
    name: file.originalname,
    size: file.size,
    type: file.mimetype,
  }).returning('image_id');
  const newImageId = newImage[0].image_id;
  await db('lesson_images').insert({lesson_id: lessonId, image_id: newImageId});
}

async function uploadMultipleImages(files: Express.Multer.File[], lessonId: number): Promise<void> {
  const newImages = await db<ImageEntity>('images').insert(files.map(item => {
    return {
      data: item.buffer,
      name: item.originalname,
      size: item.size,
      type: item.mimetype
    }
  })).returning('image_id');

  const lessonIds = newImages.map(item => {
    return {
      lesson_id: lessonId,
      image_id: item.image_id
    }
  });

  await db('lesson_images').insert(lessonIds);
}

export default {
  uploadImage,
  uploadMultipleImages
}