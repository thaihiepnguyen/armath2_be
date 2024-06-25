import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import lessonController from "../controllers/lesson.controller.js";
const router: Router = Router();

router.get("/chapters", authMiddleware.authenticate, lessonController.getAllChapter);
router.post("/get-lessons-by-chapter-id", lessonController.getLessonByChapter);
//router.post("/get-video-by-lesson-id",  lessonController.getVideoByLessonId);
router.post("/get-book-by-lesson-id", authMiddleware.authenticate, lessonController.getBookByLessonId);
router.get("/get-chapter-by-semester/:semester",  authMiddleware.authenticate, lessonController.getChapterBySemester);
router.get("/:lessonId", authMiddleware.authenticate, lessonController.getLessonById);
router.get("/images/:lessonId", authMiddleware.authenticate, lessonController.getImagesById);


export default router;
