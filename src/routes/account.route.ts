import express, {Request, Response} from 'express';
import accountController from '../controllers/account.controller.js';

const router = express.Router();

router.get("/login", accountController.loginByEmail);

export default router;