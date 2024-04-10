import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import lessonController from "../controllers/lesson.controller.js";
const router: Router = Router();

router.get("/chapters",  lessonController.getAllChapter);
router.post("/getLessonsByChapterId",  lessonController.getLessonByChapter);
router.post("/getVideoByLessonId", lessonController.getVideoByLessonId);
router.post("/getBookByLessonId", lessonController.getBookByLessonId);
export default router;
