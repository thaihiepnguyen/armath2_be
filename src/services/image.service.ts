import { ImageEntity } from "../entities/image.entity.js"
import db from "../util/db.js"


async function uploadSingleImage(file: Express.Multer.File) {
	await db<ImageEntity>('images').insert({
		data: file.buffer,
		name: file.originalname,
		size: file.size,
		type: file.mimetype
	})
}

async function getImageById(id: number) {
	return await db<ImageEntity>('images').where('image_id', id).first();
}

async function uploadMultipleImages(files: Express.Multer.File[]) {
	await db<ImageEntity>('images').insert(files.map(item => {
		return {
			data: item.buffer,
      name: item.originalname,
      size: item.size,
      type: item.mimetype
		}
	}));
}



export default {
	uploadSingleImage,
	getImageById,
	uploadMultipleImages
}