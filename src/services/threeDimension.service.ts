import db from "../util/db.js";
import {ThreeDimensionEntity} from "../entities/threeDimension.entity.js";


async function uploadSingle3d(file: Express.Multer.File): Promise<void> {
  await db<ThreeDimensionEntity>('three_dimensions').insert({
    data: file.buffer,
    name: file.originalname,
    size: file.size,
    type: file.mimetype
  })
}

async function get3dById(id: number): Promise<ThreeDimensionEntity | undefined> {
  return await db<ThreeDimensionEntity>('three_dimensions').where('id', id).first();
}

async function uploadMultiple3d(files: Express.Multer.File[]): Promise<void> {
  await db<ThreeDimensionEntity>('three_dimensions').insert(files.map(item => {
    return {
      data: item.buffer,
      name: item.originalname,
      size: item.size,
      type: item.mimetype
    }
  }));
}

export default {
  uploadSingle3d,
  get3dById,
  uploadMultiple3d
}