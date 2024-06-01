import {Router} from "express";
import multer from "multer";
import bookController from "../controllers/book.controller.js";

const router: Router = Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/upload/:lessonId', upload.single('image'), bookController.uploadBookImage);
router.post('/upload-all/:lessonId', upload.array('images'), bookController.uploadMultipleBookImages);

export default router;