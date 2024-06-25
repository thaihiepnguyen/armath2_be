import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router: Router = Router();

router.get("/get-by-id/:id", authMiddleware.authenticate, userController.getUserById);
router.get("/get-me/:platform_id", authMiddleware.authenticate, userController.getMe);
router.get("/get-personal-by-id/:platform_id", authMiddleware.authenticate, userController.getPersonalByUserId);
router.post("/update-personal", authMiddleware.authenticate, userController.updatePersonal);
router.post("/update-username", authMiddleware.authenticate, userController.updateUsername);



export default router;
