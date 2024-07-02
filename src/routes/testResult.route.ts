import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import testResultController from "../controllers/testResult.controller.js";
const router: Router = Router();

router.get("/user/:userId", authMiddleware.authenticate, testResultController.getTestResultByUserId);
router.post("/",authMiddleware.authenticate,  testResultController.addTestResult);
router.get("/user_test", authMiddleware.authenticate, testResultController.getTestResultByUserIdAndTestId);
router.get("/:id",authMiddleware.authenticate,  testResultController.getById);
export default router;
