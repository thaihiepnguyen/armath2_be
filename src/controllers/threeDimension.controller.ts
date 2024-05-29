import {Request, Response} from "express";
import threeDimensionService from "../services/threeDimension.service.js";

async function upload3d(req: Request, res: Response): Promise<any> {
  if (!req.file || !req.params.skinId) {
    return res.status(400).send({
      message: "Error: No file found or No skinId found",
      isSuccessful: false
    })
  }
  try {
    await threeDimensionService.uploadSingle3d(req.file, +req.params.skinId);
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).send({
      message: e.message,
      isSuccessful: false
    });
  }
  return res.status(200).send({
    message: "3d uploaded successfully",
    isSuccessful: true
  });
}

async function uploadMultiple3ds(req: Request, res: Response): Promise<any> {
  if (!req.files || !req.params.skinId) {
    return res.status(400).send({
      message: "Error: No files found or No skinId found",
      isSuccessful: false
    })
  }
  const files = req.files as Express.Multer.File[];
  try {
    await threeDimensionService.uploadMultiple3d(files, +req.params.skinId);
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).send({
      message: e.message,
      isSuccessful: false
    });
  }

  return res.status(200).send({
    message: "3d uploaded successfully",
    isSuccessful: true
  });
}

async function download3d(req: Request, res: Response): Promise<any> {
  const { id } = req.params;

  if (!id) {
    return res.status(404).send({
      message: "id is required",
      isSuccessful: false
    })
  }

  const threeDimension = await threeDimensionService.get3dById(+id);

  if (!threeDimension) {
    return res.status(404).send({
      message: "3d not found",
      isSuccessful: false
    })
  }

  try {
    res.set('Content-Type', threeDimension.type);
    res.set('Content-Disposition', `attachment; filename=${threeDimension.name}`);
    res.send(threeDimension.data);
  } catch (e: any) {
    console.log(e.message);
    res.status(400).send({
      message: e.message,
      isSuccessful: false
    });
  }
}


export default {
  upload3d,
  uploadMultiple3ds,
  download3d
}