import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import questionResultController from "../controllers/questionResult.controller.js";
const router: Router = Router();

router.get("/testResult/:testResultId",  questionResultController.getQuestionResultByTestResultId);
router.post("/",  questionResultController.addQuestionResult);
router.get("/:id",  questionResultController.getById);

export default router;
