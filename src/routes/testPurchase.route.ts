import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import testPurchaseController from "../controllers/testPurchase.controller.js";
const router: Router = Router();

router.get("/user/:userId",  testPurchaseController.getByUserId);

router.get("/:id",  testPurchaseController.getById);
export default router;
