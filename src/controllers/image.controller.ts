import {Request, Response} from "express";
import fs from "fs";


async function uploadUserAvatar(req: Request, res: Response): Promise<any> {
  const { metadata } = req.body;
  if (!metadata) {
    return res.status(500).json({
      isSuccessful: false,
      message: "Internal Error"
    });
  }
  const uid = metadata.uid
  if (!uid) return res.status(403).json({
    isSuccessful: false,
    message: "Forbidden"
  });

  const oldPath = './dist/images/users/' + req.file?.filename;
  const newPath = './dist/images/users/' + uid + '.' + req.file?.mimetype.split('/').pop()

  fs.renameSync(oldPath, newPath);

  return res.status(200).json({
    isSuccessful: true,
    message: "Success"
  });
}

export default {
  uploadUserAvatar
}