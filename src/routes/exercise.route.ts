import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import exerciseController from "../controllers/exercise.controller.js";
const router: Router = Router();

router.get("/:exerciseId",  authMiddleware.authenticate, exerciseController.getExerciseById);
router.get("/", authMiddleware.authenticate, exerciseController.getAllExercise);
router.get("/lesson/:lessonId", authMiddleware.authenticate, exerciseController.getExercisesByLessonId);
router.get("/test/:testId",  authMiddleware.authenticate, exerciseController.getExercisesByTestId);
router.post("/get-exercise-by-type",  authMiddleware.authenticate, exerciseController.getExerciseByType);
router.get("/chapter/:chapterId",  authMiddleware.authenticate, exerciseController.getExercisesByChapterId);
export default router;
