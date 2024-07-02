import { Request, Response } from 'express';
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

async function updateProgressByUserId(req: Request, res: Response): Promise<any> {
  try {
    const { metadata, lessonId } = req.body;
    const userId = metadata?.uid;
    if (!userId) {
      return res.status(400).json({
        isSuccessful: false,
        message: "userId is required"
      });
    }

    await achievementService.updateProgressByUserId(userId, lessonId);
    return res.status(200).json({
      isSuccessful: true,
      message: 'Progress updated successfully',
      data: {
        isUpdated: true
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isSuccessful: false,
      message: 'Internal server error',
      data: null
    });
  }
}

async function checkAndGetChapterAchievement(req: Request, res: Response): Promise<any> {
  try {
    const { metadata, chapterId } = req.body;
    const userId = metadata?.uid;
    if (!userId || !chapterId) {
      return res.status(400).json({
        isSuccessful: false,
        message: "Missing required fields"
      });
    }

    const exerciseCount = await achievementService.getExerciseCountByChapterAndUserId(chapterId, userId);
    const distinctExerciseCount = await achievementService.getDistinctExerciseCountByChapterId(chapterId);

    if (exerciseCount === distinctExerciseCount) {
      const addAchievement = await achievementService.addAchievement(userId, chapterId);
      if (addAchievement){
        return res.status(200).json({
          isSuccessful: true,
          message: 'Achievement added successfully',
          data: {
            isAdded: true
          }
        });
      }else{
        return res.status(200).json({
          isSuccessful: true,
          message: 'Achievement already added',
          data: {
            isAdded: false
          }
        });
      }
    } else {
      return res.status(200).json({
        isSuccessful: true,
        message: 'Condition not met',
        data: {
          isAdded: false
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isSuccessful: true,
      message: 'Internal server error',
      data: null
    });
  }
}

async function checkAndGetSemesterAchievement(req: Request, res: Response): Promise<any> {
  try {
    const { metadata, semester } = req.body;
    const userId = metadata?.uid;
    if (!userId || !semester) {
      return res.status(400).json({
        isSuccessful: false,
        message: "Missing required fields"
      });
    }

    const exerciseCount = await achievementService.getExerciseCountBySemesterAndUserId(semester, userId);
    const distinctExerciseCount = await achievementService.getDistinctExerciseCountBySemester(semester);

    if (exerciseCount === distinctExerciseCount) {
      const addAchievement = await achievementService.addAchievement(userId, semester === 1 ? 72 : 73);
      if (addAchievement){
        return res.status(200).json({
          isSuccessful: true,
          message: 'Achievement added successfully',
          data: {
            isAdded: true
          }
        });
      }else{
        return res.status(200).json({
          isSuccessful: true,
          message: 'Achievement already added',
          data: {
            isAdded: false
          }
        });
      }
    } else {
      return res.status(200).json({
        isSuccessful: true,
        message: 'Condition not met',
        data: {
          isAdded: false
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isSuccessful: true,
      message: 'Internal server error',
      data: null
    });
  }
}

async function checkAndGetNewAchievement(req: Request, res: Response): Promise<any> {
  try {
    const { metadata, achievementId } = req.body;
    const userId = metadata?.uid;
    if (!userId || !achievementId) {
      return res.status(400).json({
        isSuccessful: false,
        message: "Missing required fields"
      });
    }
    const addAchievement = await achievementService.addAchievement(userId, achievementId);
      if (addAchievement){
        return res.status(200).json({
          isSuccessful: true,
          message: 'Achievement added successfully',
          data: {
            isAdded: true
          }
        });
      }else{
        return res.status(200).json({
          isSuccessful: true,
          message: 'Achievement already added',
          data: {
            isAdded: false
          }
        });
      }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isSuccessful: true,
      message: 'Internal server error',
      data: null
    });
  }
}

export default {
  getAchievementsByUserId,
  getReward,
  updateProgressByUserId,
  checkAndGetChapterAchievement,
  checkAndGetSemesterAchievement,
  checkAndGetNewAchievement
}