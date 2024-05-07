import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router: Router = Router();

router.get("/get-by-id/:id", authMiddleware.authenticate, userController.getUserById);
router.get("/get-me", authMiddleware.authenticate, userController.getMe);
router.get("/get-personal-by-id", authMiddleware.authenticate, userController.getPersonalByUserId);
router.post("/update-personal", authMiddleware.authenticate, userController.updatePersonal);



export default router;
