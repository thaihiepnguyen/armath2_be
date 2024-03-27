import express, {Express, Request, Response} from 'express';
import accountService from "../services/account.service.js";


function loginByEmail(req: Request, res: Response) {
  return accountService.loginByEmail(req.body.username, req.body.password);
}

export default {
  loginByEmail
}