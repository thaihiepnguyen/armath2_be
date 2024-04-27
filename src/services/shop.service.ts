import dbUtil from "../utils/db.util.js";
import {PacketEntity} from "../entities/packet.entity.js";



async function purchaseSkin(user_id: number, skin_id: number, price: number): Promise<void> {
  await Promise.all([
    dbUtil("user_account").where("user_id", user_id).decrement("coin", price),
    dbUtil("skin_purchases").insert({user_id, skin_id})
  ]);

  const response = await dbUtil<PacketEntity>("packets")
    .insert({cost: price, star_amount: 0}).returning('packet_id');
  const packet_id = response[0].packet_id;


  await dbUtil("payments").insert({user_id, packet_id});
}

export default {
  purchaseSkin
}