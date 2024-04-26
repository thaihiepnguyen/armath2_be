import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import testResultController from "../controllers/testResult.controller.js";
const router: Router = Router();

router.get("/user/:userId",  testResultController.getTestResultByUserId);
router.post("/",  testResultController.addTestResult);
router.get("/:id",  testResultController.getById);
export default router;
