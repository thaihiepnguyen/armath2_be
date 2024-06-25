import {Router} from "express";
import multer from "multer";
import imageController from "../controllers/image.controller.js";

const router: Router = Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/upload', upload.single('image'), imageController.uploadImage);
router.post('/upload-all', upload.array('images'), imageController.uploadMultipleImages);
router.get('/download/:id', imageController.downloadImage);

export default router;