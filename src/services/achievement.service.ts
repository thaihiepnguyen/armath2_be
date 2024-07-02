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

type UserExercisesEntity = {
  user_id: number;
  lesson_id: number;
}

async function getAchievementsByUserId(userId: number): Promise<Achievement[] | undefined> {
  try {
    const sql = `
      SELECT
        a.achievement_id AS id,
        a.name,
        a.price,
        a.image_id,
        a.description,
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

async function updateProgressByUserId(userId: number, lessonId: number): Promise<void> {
  try {
    // Check if the record already exists
    const existingRecord = await db<UserExercisesEntity>("user_exercises")
      .where({
        user_id: userId,
        lesson_id: lessonId
      })
      .first();

    // If the record doesn't exist, insert a new one
    if (!existingRecord) {
      await db<UserExercisesEntity>("user_exercises").insert({
        user_id: userId,
        lesson_id: lessonId
      });
    }
  } catch (e: any) {
    console.error(e.message);
  }
}

async function getExerciseCountByChapterAndUserId(chapterId: number, userId: number): Promise<number> {
  try {
    const sql = `
      SELECT COUNT(*) AS exercise_count
      FROM user_exercises ue
      JOIN lessons l ON ue.lesson_id = l.lesson_id 
      WHERE l.chapter_id = ?
      AND ue.user_id = ?;
    `;
    const rawData = await db.raw(sql, [chapterId, userId]);
    return rawData['rows'][0]['exercise_count'];
  } catch (e) {
    console.error(e);
    return 0;
  }
}

async function getExerciseCountBySemesterAndUserId(semester: number, userId: number): Promise<number> {
  try {
    const sql = semester === 1 ? 
    `SELECT COUNT(*) AS exercise_count
      FROM user_exercises ue
      JOIN lessons l ON ue.lesson_id = l.lesson_id 
      WHERE l.chapter_id IN (1, 2, 3)
      AND ue.user_id = ?;`
    :`
      SELECT COUNT(*) AS exercise_count
      FROM user_exercises ue
      JOIN lessons l ON ue.lesson_id = l.lesson_id 
      WHERE l.chapter_id IN (4, 5, 6)
      AND ue.user_id = ?;
    `;
    const rawData = await db.raw(sql, [userId]);
    return rawData['rows'][0]['exercise_count'];
  } catch (e) {
    console.error(e);
    return 0;
  }
}

async function getDistinctExerciseCountByChapterId(chapterId: number): Promise<number> {
  try {
    const sql = `
      SELECT COUNT(DISTINCT e.lesson_id) AS count
      FROM exercises e
      JOIN lessons l ON e.lesson_id = l.lesson_id 
      WHERE l.chapter_id = ?;
    `;
    const rawData = await db.raw(sql, [chapterId]);
    return rawData['rows'][0]['count'];
  } catch (e) {
    console.error(e);
    return 0;
  }
}

async function getDistinctExerciseCountBySemester(semester: number): Promise<number> {
  try {
    const sql = semester === 1 ? 
      `SELECT COUNT(DISTINCT e.lesson_id) AS count
      FROM exercises e
      JOIN lessons l ON e.lesson_id = l.lesson_id
      JOIN chapters c ON l.chapter_id = c.chapter_id
      WHERE l.chapter_id IN (1, 2, 3)`
      :`
      SELECT COUNT(DISTINCT e.lesson_id) AS count
      FROM exercises e
      JOIN lessons l ON e.lesson_id = l.lesson_id
      JOIN chapters c ON l.chapter_id = c.chapter_id
      WHERE l.chapter_id IN (4, 5, 6)
    `;
    const rawData = await db.raw(sql);
    return rawData['rows'][0]['count'];
  } catch (e) {
    console.error(e);
    return 0;
  }
}

async function addAchievement(userId: number, achievementId: number): Promise<boolean> {
  try {
    const existingRecord = await db<UserAchievementsEntity>("user_achievements")
      .where({
        user_id: userId,
        achievement_id: achievementId
      })
      .first();

    if (existingRecord) {
      return false;
    }

    await db<UserAchievementsEntity>("user_achievements").insert({
      user_id: userId,
      achievement_id: achievementId,
      is_claimed: false
    });

    return true;
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
}

export default {
  getAchievementsByUserId,
  getReward,
  updateProgressByUserId,
  getExerciseCountByChapterAndUserId,
  getDistinctExerciseCountByChapterId,
  getExerciseCountBySemesterAndUserId,
  getDistinctExerciseCountBySemester,
  addAchievement
}