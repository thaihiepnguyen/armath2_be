import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import testController from "../controllers/test.controller.js";
const router: Router = Router();

router.get("/semester/:semester",authMiddleware.authenticate,  testController.getTestsBySemester);

router.get("/:id",authMiddleware.authenticate,  testController.getById);
export default router;
