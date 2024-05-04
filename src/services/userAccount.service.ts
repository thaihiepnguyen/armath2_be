import { UserAccountEntity } from "../entities/userAccount.entity.js";
import db from "../util/db.js";


interface TPersonalResponse {
  username: string
  totalAchievement: number
  totalNote: number
  skinUrl: string
  frameUrl: string
}

async function getUserByEmail(email: string): Promise<UserAccountEntity | undefined> {
  return db<UserAccountEntity>("user_account").where("email", email).first();
}

async function getUserById(user_id: number): Promise<UserAccountEntity | undefined> {
  return db<UserAccountEntity>("user_account").where("user_id", user_id).first();
}

async function getCoinByUserId(user_id: number): Promise<number | undefined> {
  const data = await db<UserAccountEntity>("user_account").select("coin").where("user_id", user_id).first();
  return data?.coin;
}

async function getPersonalByUserId(user_id: number): Promise<TPersonalResponse | undefined> {
  const sql = `
    SELECT 
    a.name as username,
    (SELECT cast(count(user_id) as INTEGER) FROM user_achievements where user_id = ? and is_claimed = TRUE) as totalAchievement,
    0 as totalNote,
    c.image_url as skinUrl,
    d.image_url as frameUrl
    FROM user_account a
    LEFT JOIN skin c ON c.skin_id = a.skin_id
    LEFT JOIN frames d ON d.frame_id = a.frame_id
    WHERE user_id = ?;
  `

  const data = await db.raw(sql, [user_id, user_id])
  return data["rows"];
}

export default {
  getUserByEmail,
  getUserById,
  getCoinByUserId,
  getPersonalByUserId
}