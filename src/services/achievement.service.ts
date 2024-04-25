import db from "../util/db.js";

type Achievement = {
  id: number;
  name: string;
  price: number;
  status_type: number;
}


async function getAchievementsByUserId(userId: number): Promise<Achievement[] | undefined> {
  try {
    const sql = `
      SELECT
        a.achievement_id AS id,
        a.name,
        a.price,
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


export default {
  getAchievementsByUserId
}