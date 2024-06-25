import express, {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import gameController from "../controllers/game.controller.js";
const router: Router = express.Router();

router.get("/get-game-by-lesson-id/:id", gameController.getGameByLessonId);

export default router;