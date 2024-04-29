import db from "../util/db.js";
import {SkinEntity} from "../entities/skin.entity.js";


async function getAllSkins(): Promise<SkinEntity[] | undefined> {
  const data= await db<SkinEntity>("skin").select('*');
  return data.length > 0 ? data : undefined;
}

async function getPriceById(id: number): Promise<number | undefined> {
  const data= await db<SkinEntity>("skin").select('price').where('skin_id', id).first();
  return data?.price;
}


export default {
  getAllSkins,
  getPriceById
}