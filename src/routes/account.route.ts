import express, {Router} from "express";
import accountController from "../controllers/account.controller.js";

const router: Router = express.Router();

router.post("/login-by-email", accountController.loginByEmail);
router.post("/login-external-party", accountController.loginExternalParty);
router.post("/register-by-email", accountController.registerByEmail);
router.post("/register-by-phone", accountController.registerByPhone);
router.get("/verify-email", accountController.verifyEmail);
router.post("/verify-phone", accountController.verifyPhoneNumber);
router.post("/resend-verification-email", accountController.resendVerificationEmail);
router.get("/logout", accountController.logout);
router.get("/refresh-token", accountController.refreshToken);

export default router;