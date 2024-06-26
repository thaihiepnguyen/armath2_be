import express, {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import shopController from "../controllers/shop.controller.js";
const router: Router = express.Router();

router.get("/get-all", authMiddleware.authenticate, shopController.getAll);
router.post("/purchase", authMiddleware.authenticate, shopController.purchase);

export default router;