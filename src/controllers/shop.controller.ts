import {Request, Response} from "express";
import shopService from "../services/shop.service.js";



async function getAll(req: Request, res: Response): Promise<any> {
  try {
    const { metadata } = req.body;

    const uid = metadata?.uid;

    if (!uid) {
      return res.status(400).json({
        isSuccessful: false,
        message: `userId is required`
      });
    }

    const data = await shopService.getAll(uid);

    return res.status(200).json({
      isSuccessful: true,
      message: "success",
      data: data
    });
  } catch (error: any) {
    console.log(error.message)
    return {
      isSuccessful: false,
      message: error.message
    };
  }
}

async function purchase(req: Request, res: Response): Promise<any> {
  try {
    const { type, id } = req.body;
    if (!type || !id) {
      return res.status(400).json({
        isSuccessful: false,
        message: `id and type is required`
      });
    }

    const { metadata } = req.body;

    const uid = metadata?.uid;

    if (!uid) {
      return res.status(400).json({
        isSuccessful: false,
        message: `userId is required`
      });
    }

    if (type == "skins") {
      const { isSuccessful, errorCode, message } = await shopService.purchaseSkin(uid, id);
      console.log(message)
      return res.status(errorCode).json({
        message,
        isSuccessful
      })
    } else if (type == "frames") {
      const { isSuccessful, errorCode, message } = await shopService.purchaseFrame(uid, id);
      console.log(message)
      return res.status(errorCode).json({
        message,
        isSuccessful
      })
    } else if (type == "tests") {
      const { isSuccessful, errorCode, message } = await shopService.purchaseTest(uid, id);
      console.log(message)
      return res.status(errorCode).json({
        message,
        isSuccessful
      })
    } else {
      return res.status(400).json({
        message: "Type doesn't support",
        isSuccessful: false,
      });
    }
  }
  catch (error: any) {
    return res.status(500).json({
      message: error.message,
      isSuccessful: false,
    });
  }
}

export default {
  getAll,
  purchase
}

