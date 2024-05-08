import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import exerciseController from "../controllers/exercise.controller.js";
const router: Router = Router();

router.get("/:exerciseId",  exerciseController.getExerciseById);
router.get("/",  exerciseController.getAllExercise);
router.get("/lesson/:lessonId",  exerciseController.getExercisesByLessonId);
router.get("/test/:testId",  exerciseController.getExercisesByTestId);
router.post("/get-exercise-by-type",  exerciseController.getExerciseByType);
router.get("/chapter/:chapterId",  exerciseController.getExercisesByChapterId);
export default router;
