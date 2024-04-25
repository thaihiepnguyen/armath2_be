import db from "../util/db.js";

type Achievement = {
  id: number;
  name: string;
  is_completed: boolean;
}


async function getAchievementsByUserId(userId: number): Promise<Achievement[] | undefined> {
  try {
    const sql = `
    SELECT
      a.achievement_id AS id,
      a.name,
      CASE
        WHEN ua.user_id IS NULL THEN false
        ELSE true END AS is_completed
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