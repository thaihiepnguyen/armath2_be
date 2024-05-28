import {Router} from "express";
import multer from "multer";
import threeDimensionController from "../controllers/threeDimension.controller.js";

const router: Router = Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/upload', upload.single('3d'), threeDimensionController.upload3d);
router.post('/upload-all', upload.array('3ds'), threeDimensionController.uploadMultiple3ds);
router.get('/download/:id', threeDimensionController.download3d);

export default router;