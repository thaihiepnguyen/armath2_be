import express, {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import achievementController from "../controllers/achievement.controller.js";

const router: Router = express.Router();

router.get("/get-by-user-id", authMiddleware.authenticate, achievementController.getAchievementsByUserId);
router.post("/get-reward", authMiddleware.authenticate, achievementController.getReward);
router.post("/update-progress", authMiddleware.authenticate, achievementController.updateProgressByUserId);
router.post("/chapter", authMiddleware.authenticate, achievementController.checkAndGetChapterAchievement);
router.post("/semester", authMiddleware.authenticate, achievementController.checkAndGetSemesterAchievement);
router.post("/new-achievement", authMiddleware.authenticate, achievementController.checkAndGetNewAchievement);

export default router;