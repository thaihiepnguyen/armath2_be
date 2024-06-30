import {Router} from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import testPurchaseController from "../controllers/testPurchase.controller.js";
const router: Router = Router();

router.get("/user",authMiddleware.authenticate,  testPurchaseController.getByUserId);

router.get("/:id",authMiddleware.authenticate,  testPurchaseController.getById);
export default router;
