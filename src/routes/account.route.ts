import express, {Router} from "express";
import accountController from "../controllers/account.controller.js";

const router: Router = express.Router();

router.post("/login-by-email", accountController.loginByEmail);
router.post("/register-by-email", accountController.registerByEmail);
router.get("/verify-email", accountController.verifyEmail);

export default router;