import {Request, Response} from 'express';
import userService from "../services/userLoginData.service.js";
import userAccountService from '../services/userAccount.service.js';
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

async function getMe(req: Request, res: Response): Promise<any> {
  const { metadata } = req.body;
  if (!metadata) {
    return res.status(500).json({
      isSuccessful: false,
      message: 'Interal Error',
    });
  }
  const uid = metadata.uid;
  const user = await userAccountService.getUserById(uid);
  if (!user) {
    return res.status(500).json({
      isSuccessful: false,
      message: 'Interal Error',
    });
  }

  return res.status(200).json({
    isSuccessful: true,
    message: 'success',
    data: user
  });
}

async function getPersonalByUserId(req: Request, res: Response): Promise<any> {
  const { metadata } = req.body;
  const { platform_id } = req.params;
  if (!metadata || !platform_id) {
    return res.status(500).json({
      isSuccessful: false,
      message: 'Interal Error',
    });
  }
  const uid = metadata.uid;
  let user = undefined
  try {
    user = await userAccountService.getPersonalByUserId(uid, +platform_id);
  } catch (e: any) {
    console.log(e)
  }

  if (!user) {
    return res.status(500).json({
      isSuccessful: false,
      message: 'Interal Error',
    });
  }

  return res.status(200).json({
    isSuccessful: true,
    message: 'success',
    data: user
  });
}

async function updatePersonal(req: Request, res: Response): Promise<any> {
  try {
    const { metadata } = req.body;
    const uid = metadata?.uid;
    if (!uid) {
      return res.status(400).json({
        isSuccessful: false,
        message: "userId is required"
      });
    }

    const { type, id } = req.body;
    if (!type || !id) {
      return res.status(400).json({
        isSuccessful: false,
        message: `id and type is required`
      });
    }

    if (type == "skin") {
      await userAccountService.updateSkin(uid, id);
      return res.status(200).json({
        isSuccessful: true,
        message: "success"
      });
    } else if (type == "frame") {
      await userAccountService.updateFrame(uid, id);
      return res.status(200).json({
        isSuccessful: true,
        message: "success"
      });
    } else {
      return res.status(400).json({
        isSuccessful: false,
        message: `Invalid type`
      });
    }

  } catch (e: any) {
    return res.status(500).json({
      isSuccessful: false,
      message: e.message
    });
  }
}

async function updateUsername(req: Request, res: Response): Promise<any> {
  try {
    const { metadata } = req.body;
    const uid = metadata?.uid;
    if (!uid) {
      return res.status(400).json({
        isSuccessful: false,
        message: "userId is required"
      });
    }

    const { username } = req.body;
    if (!username) {
      return res.status(400).json({
        isSuccessful: false,
        message: `username is required`
      });
    }

    await userAccountService.updateUsername(uid, username);
    return res.status(200).json({
      isSuccessful: true,
      message: "success"
    });

  } catch (e: any) {
    return res.status(500).json({
      isSuccessful: false,
      message: e.message
    });
  }
}

export default {
  getUserById,
  getMe,
  getPersonalByUserId,
  updatePersonal,
  updateUsername
}