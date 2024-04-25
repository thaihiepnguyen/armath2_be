import express, {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import achievementController from "../controllers/achievement.controller.js";

const router: Router = express.Router();

router.get("/get-by-user-id", authMiddleware.authenticate, achievementController.getAchievementsByUserId);

export default router;