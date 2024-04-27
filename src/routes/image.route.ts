import {Router} from "express";
import upload from "../utils/upload.util.js";
import imageController from "../controllers/image.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/upload-avatar", upload.single("img"), authMiddleware.authenticate , imageController.uploadUserAvatar);
router.get("/get-avatar", authMiddleware.authenticate, imageController.getUserAvatar);

export default router;