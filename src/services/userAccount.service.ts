import { UserAccountEntity } from "../entities/userAccount.entity.js";
import db from "../util/db.js";

interface TSkinsPurchased {
  skinId: number
  imageSkinId: number
}

interface TFramesPurchased {
  frameId: number
  imageFrameId: number
}

interface TPersonalResponse {
  username: string
  totalAchievement: number
  totalNote: number
  imageSkinId: number
  imageFrameId: number
  skinsPurchased: TSkinsPurchased[]
  framesPurchased: TFramesPurchased[]
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
          c.image_id as imageSkinId,
          d.image_id as imageFrameId
      FROM user_account a
       LEFT JOIN skin c ON c.skin_id = a.skin_id
       LEFT JOIN frames d ON d.frame_id = a.frame_id
      WHERE user_id = ?;
  `;
  const sqlSkinsPurchased = `
     SELECT 
          s.skin_id as skinId,
          s.image_id as imageSkinId
     FROM user_account ua
     LEFT JOIN skin_purchases sp ON ua.user_id = sp.user_id
     LEFT JOIN skin s ON sp.skin_id = s.skin_id
     WHERE ua.user_id = ?;
  `;

  const sqlFramesPurchased = `
      SELECT 
            f.frame_id as frameId,
            f.image_id as imageFrameId
      FROM user_account ua
      LEFT JOIN frame_purchases fp ON ua.user_id = fp.user_id
      LEFT JOIN frames f ON fp.frame_id = f.frame_id
      WHERE ua.user_id = ?;
    `;

  const [rawData, skinsPurchased, framesPurchased] = await Promise.all([
    db.raw(sql, [user_id, user_id]).then(data => data["rows"]?.[0]),
    db.raw(sqlSkinsPurchased, [user_id]).then(data => data["rows"]),
    db.raw(sqlFramesPurchased, [user_id]).then(data => data["rows"])
  ]);

  if (!rawData) {
    return undefined;
  }

  return {
    ...rawData,
    skinsPurchased,
    framesPurchased
  } as TPersonalResponse;
}

async function updateSkin(user_id: number, skin_id: number): Promise<void> {
  await db<UserAccountEntity>("user_account").where("user_id", user_id).update({ skin_id });
}

async function updateFrame(user_id: number, frame_id: number): Promise<void> {
  await db<UserAccountEntity>("user_account").where("user_id", user_id).update({ frame_id });
}

async function updateUsername(user_id: number, name: string): Promise<void> {
  await db<UserAccountEntity>("user_account").where("user_id", user_id).update({ name });
}

export default {
  getUserByEmail,
  getUserById,
  getCoinByUserId,
  getPersonalByUserId,
  updateSkin,
  updateFrame,
  updateUsername
}