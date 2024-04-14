import {Request, Response} from 'express';
import userService from "../services/user.service.js";
import numberUtil from "../util/number.util.js";

async function getUserById(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const { metadata } = req.body;

  if (!numberUtil.isNumberString(id)) {
    return res.status(400).json({
      isSuccessful: false,
      message: "id is not a number"
    });
  }
  const userId = Number(id);
  const uid = metadata.uid;
  if (uid !== userId) {
    return res.status(403).json({
      isSuccessful: false,
      message: "Forbidden"
    });
  }

  const user = await userService.getUserById(userId);
  if (user) {
    user["password"] = undefined;
  }

  return res.status(200).json({
    isSuccessful: true,
    message: user ? `User id ${id} is found` : `User id ${id} is not found`,
    data: user
  });
}

export default {
  getUserById
}