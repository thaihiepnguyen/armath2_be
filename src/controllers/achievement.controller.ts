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
  if (!achievements) {
    return res.status(500).json({
      isSuccessful: false,
      message: "Internal server error"
    });
  }

  return res.status(200).json({
    isSuccessful: true,
    message: achievements && achievements.length > 0 ?
      `Achievements for user id ${userId} are found` :
      `Achievements for user id ${userId} are not found`,
    data: achievements
  });
}

async function getReward(req: Request, res: Response): Promise<any> {
  const { metadata, price, achievement_id } = req.body;
  const user_id = metadata?.uid;
  if (!user_id) {
    return res.status(400).json({
      isSuccessful: false,
      message: "userId is required"
    });
  }

  await achievementService.getReward(user_id, achievement_id, price);
  return res.status(200).json({
    isSuccessful: true,
    message: 'success',
    data: null
  });
}


export default {
  getAchievementsByUserId,
  getReward
}