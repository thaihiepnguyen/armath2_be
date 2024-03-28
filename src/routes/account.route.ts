import express from 'express';
import accountController from '../controllers/account.controller.js';

const router = express.Router();

router.post("/login-by-email", accountController.loginByEmail);
router.post("/register-by-email", accountController.registerByEmail);

export default router;