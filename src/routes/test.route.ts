import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import testController from "../controllers/test.controller.js";
const router: Router = Router();

router.get("/semester/:semester",  testController.getTestsBySemester);

router.get("/:id",  testController.getById);
export default router;
