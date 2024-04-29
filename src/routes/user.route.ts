import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router: Router = Router();

router.get("/get-by-id/:id", authMiddleware.authenticate, userController.getUserById);
router.get("/get-me", authMiddleware.authenticate, userController.getMe);



export default router;
