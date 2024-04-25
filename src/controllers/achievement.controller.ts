import {Request, Response} from 'express';
import achievementService from "../services/achievement.service.js";

async function getAchievementsByUserId(req: Request, res: Response): Promise<any> {
  const { metadata } = req.body;
  const userId = metadata?.uid;
  if (!userId) {
    return res.status(400).json({
      isSuccessful: false,
      message: "userId is required"
    });
  }

  const achievements = await achievementService.getAchievementsByUserId(userId);

  return res.status(200).json({
    isSuccessful: true,
    message: achievements && achievements.length > 0 ?
      `Achievements for user id ${userId} are found` :
      `Achievements for user id ${userId} are not found`,
    data: achievements
  });
}


export default {
  getAchievementsByUserId
}