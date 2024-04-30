import db from "../util/db.js";
import {PacketEntity} from "../entities/packet.entity.js";
import {SkinEntity} from "../entities/skin.entity.js";
import {FrameEntity} from "../entities/frame.entity.js";
import {TestEntity} from "../entities/test.entity.js";
import userAccountService from "./userAccount.service.js";
import { TBaseDto } from "../app.typing.js";
import { response } from "express";


interface TSkinResponse extends SkinEntity {
  is_purchased: boolean
}

interface TFrameResponse extends FrameEntity {
  is_purchased: boolean
}

interface TTestResponse extends TestEntity {
  is_purchased: boolean
}


type TShopResponse = {
  skins: TSkinResponse[],
  frames: TFrameResponse[],
  tests: TTestResponse[]
}

async function getSkinPriceById(id: number): Promise<number | undefined> {
  const data= await db<SkinEntity>("skin").select('price').where('skin_id', id).first();
  return data?.price;
}

async function getFramePriceById(id: number): Promise<number | undefined> {
  const data= await db<FrameEntity>("frames").select('price').where('frame_id', id).first();
  return data?.price;
}

async function getTestPriceById(id: number): Promise<number | undefined> {
  const data= await db<TestEntity>("tests").select('price').where('test_id', id).first();
  return data?.price;
}



async function purchaseSkin(user_id: number, skin_id: number): Promise<TBaseDto<undefined>> {
  const [coin, price] = await Promise.all([
    userAccountService.getCoinByUserId(user_id),
    getSkinPriceById(skin_id)
  ]);
  
  if (coin === undefined || price === undefined) {
    return {
      errorCode: 400,
      isSuccessful: false,
      message: `Coin or Price is not found`
    };
  }

  if (coin < price) {
    return {
      errorCode: 400,
      isSuccessful: false,
      message: `Not enough coin`
    };
  }
  try {
    await Promise.all([
      db("user_account").where("user_id", user_id).decrement("coin", price),
      db("skin_purchases").insert({user_id, skin_id})
    ]);
    
    return {
      errorCode: 200,
      isSuccessful: true,
      message: "purchased successfully"
    }
  } catch(error: any) {
    console.log(error.message)
    return {
      errorCode: 400,
      isSuccessful: false,
      message: error.message
    }
  }
}

async function purchaseFrame(user_id: number, frame_id: number): Promise<TBaseDto<undefined>> {
  const [coin, price] = await Promise.all([
    userAccountService.getCoinByUserId(user_id),
    getFramePriceById(frame_id)
  ]);
  
  if (coin === undefined || price === undefined) {
    return {
      errorCode: 400,
      isSuccessful: false,
      message: `Coin or Price is not found`
    };
  }

  if (coin < price) {
    return {
      errorCode: 400,
      isSuccessful: false,
      message: `Not enough coin`
    };
  }
  try {
    await Promise.all([
      db("user_account").where("user_id", user_id).decrement("coin", price),
      db("frame_purchases").insert({user_id, frame_id})
    ]);
    
    return {
      errorCode: 200,
      isSuccessful: true,
      message: "purchased successfully"
    }
  } catch(error: any) {
    console.log(error.message)
    return {
      errorCode: 400,
      isSuccessful: false,
      message: error.message
    }
  }
}

async function purchaseTest(user_id: number, test_id: number): Promise<TBaseDto<undefined>> {
  const [coin, price] = await Promise.all([
    userAccountService.getCoinByUserId(user_id),
    getTestPriceById(test_id)
  ]);
  
  if (coin === undefined || price === undefined) {
    return {
      errorCode: 400,
      isSuccessful: false,
      message: `Coin or Price is not found`
    };
  }

  if (coin < price) {
    return {
      errorCode: 400,
      isSuccessful: false,
      message: `Not enough coin`
    };
  }
  try {
    await Promise.all([
      db("user_account").where("user_id", user_id).decrement("coin", price),
      db("test_purchases").insert({user_id, test_id})
    ]);
    
    return {
      errorCode: 200,
      isSuccessful: true,
      message: "purchased successfully"
    }
  } catch(error: any) {
    console.log(error.message)
    return {
      errorCode: 400,
      isSuccessful: false,
      message: error.message
    }
  }
}

async function getAll(user_id: number): Promise<TShopResponse> {
  const skinSQL = `
    SELECT 
    s.*,
    CASE 
    WHEN sp.user_id IS NULL THEN FALSE ELSE TRUE 
    END as is_purchased
    FROM skin s
    LEFT JOIN skin_purchases sp ON s.skin_id = sp.skin_id AND sp.user_id = ?
    ORDER BY is_purchased asc
    LIMIT ?;
  `

  const frameSQL = `
    SELECT  
    f.*,
    CASE 
    WHEN fp.user_id IS NULL THEN FALSE ELSE TRUE 
    END as is_purchased
    FROM frames f
    LEFT JOIN frame_purchases fp ON f.frame_id = fp.frame_id AND fp.user_id = ?
    ORDER BY is_purchased asc
    LIMIT ?;
  `

  const testSQL = `
    SELECT  
    t.*,
    CASE 
    WHEN tp.user_id IS NULL THEN FALSE ELSE TRUE 
    END as is_purchased
    FROM tests t
    LEFT JOIN test_purchases tp ON t.test_id = tp.test_id AND tp.user_id = ?
    ORDER BY is_purchased asc
    LIMIT ?;
  `

  const [skins, frames, tests] = await Promise.all([
    db.raw(skinSQL, [user_id, 6]).then((response) => response["rows"]),
    db.raw(frameSQL, [user_id, 6]).then((response) => response["rows"]),
    db.raw(testSQL, [user_id, 6]).then((response) => response["rows"])
  ]);

  return {
    skins,
    frames,
    tests
  }
}

export default {
  purchaseSkin,
  purchaseTest,
  purchaseFrame,
  getAll
}