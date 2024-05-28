import db from "../util/db.js";
import {ThreeDimensionEntity} from "../entities/threeDimension.entity.js";

const FLATFORM = {
  'Android': 1,
  'iOS': 2
} as any;

async function uploadSingle3d(file: Express.Multer.File, skinId: number): Promise<void> {
  const platform = file.originalname.split('.')[0].split('-')[1];
  const platformId = FLATFORM[platform];

  if (!platformId) {
    throw new Error('Invalid platform: ' + platform);
  }

  const newThreeDimension = await db<ThreeDimensionEntity>('three_dimensions').insert({
    data: file.buffer,
    name: file.originalname,
    size: file.size,
    type: file.mimetype,
    platform_id: platformId
  }).returning('id');
  const threeDimensionId = newThreeDimension[0].id
  await db('skin_3ds').insert({skin_id: skinId, three_dimension_id: threeDimensionId});
}

async function get3dById(id: number): Promise<ThreeDimensionEntity | undefined> {
  return await db<ThreeDimensionEntity>('three_dimensions').where('id', id).first();
}

async function uploadMultiple3d(files: Express.Multer.File[], skinId: number): Promise<void> {
  const newThreeDimensions = await db<ThreeDimensionEntity>('three_dimensions').insert(files.map(item => {
    const platform = item.originalname.split('.')[0].split('-')[1];
    const platformId = FLATFORM[platform];
    if (!platformId) {
      throw new Error('Invalid platform');
    }
    return {
      data: item.buffer,
      name: item.originalname,
      size: item.size,
      type: item.mimetype,
      platform_id: platformId
    }
  })).returning('id');

  const threeDimensionIds = newThreeDimensions.map(item => {
    return {
      skin_id: skinId,
      three_dimension_id: item.id
    }
  });

  await db('skin_3ds').insert(threeDimensionIds);
}

export default {
  uploadSingle3d,
  get3dById,
  uploadMultiple3d
}