import db from "../util/db.js";
import {PacketEntity} from "../entities/packet.entity.js";
import {SkinEntity} from "../entities/skin.entity.js";
import {FrameEntity} from "../entities/frame.entity.js";
import {TestEntity} from "../entities/test.entity.js";

type TShopResponse = {
  skins: SkinEntity[],
  frames: FrameEntity[],
  tests: TestEntity[]
}

async function purchaseSkin(user_id: number, skin_id: number, price: number): Promise<void> {
  await Promise.all([
    db("user_account").where("user_id", user_id).decrement("coin", price),
    db("skin_purchases").insert({user_id, skin_id})
  ]);

  const response = await db<PacketEntity>("packets")
    .insert({cost: price, star_amount: 0}).returning('packet_id');
  const packet_id = response[0].packet_id;


  await db("payments").insert({user_id, packet_id});
}

async function getAll(): Promise<TShopResponse> {
  const [skins, frames, tests] = await Promise.all([
    db<SkinEntity>("skin").select('*').limit(6),
    db<FrameEntity>("frames").select('*').limit(6),
    db<TestEntity>("tests").select('*').limit(6)
  ]);

  return {
    skins,
    frames,
    tests
  }
}

export default {
  purchaseSkin,
  getAll
}