import {Request, Response} from "express";
import shopService from "../services/shop.service.js";
import userAccountService from "../services/userAccount.service.js";
import skinService from "../services/skin.service.js";



async function getAll(req: Request, res: Response): Promise<any> {
  try {
    const data = await shopService.getAll();

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

async function purchaseSkin(req: Request, res: Response): Promise<any> {
  try {
    const { skinId } = req.body;
    if (!skinId) {
      return res.status(400).json({
        isSuccessful: false,
        message: `SkinId is required`
      });
    }

    const { metadata } = req.body;
    if (!metadata) {
      return res.status(400).json({
        isSuccessful: false,
        message: `Metadata is required`
      });
    }

    const { uid } = metadata;
    if (!uid) {
      return res.status(500).json({
        isSuccessful: false,
        message: `Internal error`
      });
    }

    const [coin, price] = await Promise.all([
      userAccountService.getCoinByUserId(uid),
      skinService.getPriceById(skinId)]);
    if (!coin || !price) {
      return res.status(404).json({
        isSuccessful: false,
        message: `Coin or Price is not found`
      });
    }

    if (coin < price) {
      return res.status(400).json({
        isSuccessful: false,
        message: `Not enough coin`
      });
    }

    await shopService.purchaseSkin(uid, skinId, price);

    return res.status(200).json({
      isSuccessful: true,
      message: `Skin ${skinId} is purchased`
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
}

export default {
  purchaseSkin,
  getAll
}

