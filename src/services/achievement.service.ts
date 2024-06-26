import { UserAccountEntity } from "../entities/userAccount.entity.js";
import { UserAchievementsEntity } from "../entities/userAchievements.entity.js";
import db from "../util/db.js";

type Achievement = {
  id: number;
  name: string;
  price: number;
  image_id: number,
  status_type: number;
}


async function getAchievementsByUserId(userId: number): Promise<Achievement[] | undefined> {
  try {
    const sql = `
      SELECT
        a.achievement_id AS id,
        a.name,
        a.price,
        a.image_id,
        CASE
            WHEN ua.is_claimed IS NULL THEN 0
            WHEN ua.is_claimed IS FALSE THEN 1
            WHEN ua.is_claimed IS TRUE THEN 2 END AS status_type
      FROM achievements AS a
      LEFT JOIN user_achievements ua ON a.achievement_id = ua.achievement_id AND ua.user_id = ?;
  `
    const rawData = await db.raw(sql, [userId]);
    return rawData['rows'];
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

async function getReward(userId: number, achievementId: number, price: number): Promise<void> {
  try {
    await db<UserAchievementsEntity>("user_achievements").update({
      is_claimed: true
    }).where({
      user_id: userId,
      achievement_id: achievementId
    });
  
    await db<UserAccountEntity>("user_account").increment("coin", price).where("user_id", userId);
  } catch(e: any) {
    console.log(e.message)
  }
}


export default {
  getAchievementsByUserId,
  getReward
}