import {Router} from "express";
import imageController from "../controllers/image.controller.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/upload-avatar",
  uploadMiddleware.userUploadMiddleware,
  authMiddleware.authenticate,
  imageController.uploadUserAvatar);

export default router;