import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import lessonController from "../controllers/lesson.controller.js";
const router: Router = Router();

router.get("/chapters",  lessonController.getAllChapter);
router.get("/getLessonsByChapterId/:chapter",  lessonController.getLessonByChapter);

export default router;
