import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import noteController from "../controllers/note.controller.js";
const router: Router = Router();

router.get("/get-all", authMiddleware.authenticate, noteController.getAllNotes);
router.post("/add-new", authMiddleware.authenticate, noteController.addUserNote);
router.post("/check-exists", authMiddleware.authenticate, noteController.checkUserNoteExists);

export default router;
