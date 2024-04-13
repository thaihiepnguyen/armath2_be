import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import exerciseController from "../controllers/exercise.controller.js";
const router: Router = Router();

router.get("/:exerciseId",  exerciseController.getExerciseById);
router.get("/",  exerciseController.getAllExercise);
export default router;
