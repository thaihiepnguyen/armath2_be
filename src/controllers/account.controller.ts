import {Request, Response} from 'express';
import accountService from "../services/account.service.js";
import cookieUtil from "../util/cookie.util.js";

async function loginByEmail(req: Request, res: Response): Promise<any> {
  const { email, password, rememberMe } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
      isSuccessful: false
    });
  }

  const {
    isSuccessful,
    message,
    data,
    errorCode
  } = await accountService.loginByEmail(email, password, rememberMe);

  if (isSuccessful) {
    cookieUtil.setCookie(res, data);
    return res.status(200).json({
      message,
      isSuccessful: true,
      data: data.uid
    });
  } else {
    return res.status(errorCode).json({
      message,
      isSuccessful: false
    });
  }
}

async function registerByEmail(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
      isSuccessful: false
    });
  }

  const {
    message,
    errorCode,
    isSuccessful
  } = await accountService.registerByEmail(email, password);

  return res.status(errorCode).json({
    message,
    isSuccessful
  });
}

async function registerByPhone(req: Request, res: Response): Promise<any> {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({
      message: "phone and password are required",
      isSuccessful: false
    });
  }

  const {
    message,
    errorCode,
    isSuccessful
  } = await accountService.registerByPhone(phone, password);

  return res.status(errorCode).json({
    message,
    isSuccessful
  });
}

async function verifyEmail(req: Request, res: Response): Promise<any> {
const { token } = req.query;
  if (!token) {
    return res.status(400).json({
      message: "token are required"
    });
  }

  const {
    message,
    errorCode
  } = await accountService.verifyEmail(token as string);

  return res.status(errorCode).json({
    message
  });
}

async function verifyPhoneNumber(req: Request, res: Response): Promise<any> {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({
      message: "phone number not found"
    });
  }

  const {
    message,
    errorCode,
    isSuccessful,
  } = await accountService.verifyPhoneNumber(phone);

  return res.status(errorCode).json({
    message,
    isSuccessful
  });
  }

function refreshToken(req: Request, res: Response): any {
  const { rft } = req.cookies;
  if (!rft) {
    return res.status(400).json({
      message: "refresh token is required",
      isSuccessful: false
    });
  }

  const {
    isSuccessful,
    message,
    errorCode,
    data,
  } = accountService.refreshToken(rft);

  if (!data) {
    return res.status(errorCode).json({
      message,
      isSuccessful: false
    });
  }

  if (isSuccessful && errorCode === 200) {
    cookieUtil.setCookie(res, data);
  }
  return res.status(errorCode).json({
    message,
    isSuccessful: true,
  });
}

async function resendVerificationEmail(req: Request, res: Response): Promise<any> {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "email is required"
    });
  }

  const {
    message,
    errorCode
  } = await accountService.resendVerificationEmail(email);

  return res.status(errorCode).json({
    message
  });
}

function logout(req: Request, res: Response): any {
  cookieUtil.clearCookie(res);
  return res.status(200).json({
    message: "logout success"
  });
}

async function loginExternalParty(req: Request, res: Response): Promise<any> {
  const { email, uid, token, platform } = req.body;
  if (!email || !uid || !token) {
    return res.status(400).json({
      message: "required information is empty",
      isSuccessful: false
    });
  }

  const {
    isSuccessful,
    message,
    data,
    errorCode
  } = await accountService.loginExternalParty(email, uid, token, platform);

  if (isSuccessful) {
    cookieUtil.setCookie(res, data);
    return res.status(200).json({
      message,
      isSuccessful: true,
      data: data.uid
    });
  } else {
    return res.status(errorCode).json({
      message,
      isSuccessful: false
    });
  }
}

export default {
  loginByEmail,
  registerByEmail,
  registerByPhone,
  verifyEmail,
  verifyPhoneNumber,
  refreshToken,
  resendVerificationEmail,
  logout,
  loginExternalParty,
}