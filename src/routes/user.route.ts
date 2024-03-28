import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router: Router = Router();

router.get("/byId/:id", authMiddleware.authenticate, userController.findUserById);

export default router;
