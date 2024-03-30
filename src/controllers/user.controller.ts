import {Request, Response} from 'express';
import userService from "../services/user.service.js";
import numberUtil from "../util/number.util.js";

async function getUserById(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const { metadata } = req.body;

  if (!numberUtil.isNumberString(id)) {
    return res.status(400).json({
      message: "id is not a number"
    });
  }

  const uid = metadata.uid;
  if (uid !== Number(id)) {
    return res.status(403).json({
      message: "Forbidden"
    });
  }

  const user = await userService.getUserById(Number(id));

  return res.status(200).json({
    message: user ? `User id ${id} is found` : `User id ${id} is not found`,
    data: user
  });
}

export default {
  getUserById
}