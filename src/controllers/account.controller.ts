import {Request, Response} from 'express';
import accountService from "../services/account.service.js";
import appConst from "../app.const.js";


async function loginByEmail(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required"
    });
  }

  const {
    isSuccessful,
    message,
    data,
    errorCode
  } = await accountService.loginByEmail(email, password);

  if (isSuccessful) {
    res.cookie("act", data.act, {
      httpOnly: false,
      maxAge: appConst.EXPIRES_COOKIE.IN7DAYS,
    })
    return res.status(200).json({
      message
    });
  } else {
    return res.status(errorCode).json({
      message
    });
  }
}

async function registerByEmail(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required"
    });
  }

  const {
    isSuccessful,
    message,
    data,
    errorCode
  } = await accountService.registerByEmail(email, password);

  if (isSuccessful) {
    return res.status(200).json({
      message,
      data
    });
  } else {
    return res.status(errorCode).json({
      message
    });
  }
}

export default {
  loginByEmail,
  registerByEmail
}