import db from "../util/db.js";
import {generateUsername} from "unique-username-generator";
import {JWTError, TBaseDto, TCookieData, TMetadata, TPayload} from "../app.typing.js";
import * as bcrypt from "bcrypt";
import {UserEntity} from "../entities/user.entity.js";
import jwt from "jsonwebtoken";
import appConst from "../app.const.js";
import {TemplateEmailEntity} from "../entities/templateEmail.entity.js";
import mailService from "./mail.service.js";
import userService from "./user.service.js";

async function loginByEmail(email: string, password: string): Promise<TBaseDto<any>> {
  const user: UserEntity | undefined = await userService.getUserByEmail(email);
  if (!user) {
    return {
      isSuccessful: false,
      message: "email not found",
      errorCode: 404
    }
  }

  if (!user.is_valid) {
    return {
      isSuccessful: false,
      message: "email not verified",
      errorCode: 403
    }
  }

  const isPasswordMatch: boolean = await bcrypt.compare(password, user.password!!);
  if (!isPasswordMatch) {
    return {
      isSuccessful: false,
      message: "password is incorrect",
      errorCode: 400
    }
  }

  const payload: TPayload = {
    uid: user.user_id,
    email: user.email,
    uname: user.name
  }

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: appConst.EXPIRES_ACCESS_TOKEN_IN
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: appConst.EXPIRES_REFRESH_TOKEN_IN
  });

  return {
    isSuccessful: true,
    message: "login success",
    data: {
      act: accessToken,
      rft: refreshToken,
      uid: user.user_id
    },
    errorCode: 200
  }
}

async function registerByEmail(email: string, password: string): Promise<TBaseDto<undefined>> {
  const user: UserEntity | undefined = await userService.getUserByEmail(email);
  if (user) {
    return {
      isSuccessful: false,
      message: "email already exist",
      errorCode: 400
    }
  }

  password = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS as string) || 10);
  try {
    const newUser = await db<UserEntity>("users").insert({
      email,
      password,
      name: generateUsername("", 3)
    }).returning('user_id');

    const newId = newUser[0].user_id;

    const emailTemplate = await db<TemplateEmailEntity>("email_templates").where("id", 50).first();
    if (!emailTemplate) {
      return {
        isSuccessful: false,
        message: "Internal Error",
        errorCode: 500
      }
    }
    const user = await userService.getUserById(newId)
    if (!user) {
      return {
        isSuccessful: false,
        message: "Internal Error",
        errorCode: 500
      }
    }
    const payload: TPayload = {
      uid: user.user_id,
      email: user.email,
      uname: user.name
    }
    return mailService.sendEmailVerification(payload, appConst.TEMPLATE_EMAIL.VERIFICATION)
  } catch (error) {
    return {
      message: "register failed",
      isSuccessful: false,
      errorCode: 500
    }
  }
}

async function verifyEmail(token: string): Promise<TBaseDto<undefined>> {
  let decoded: TPayload;
  try {
    decoded = jwt.verify(token as string, process.env.JWT_SECRET || 'secret') as TPayload;
  } catch (error) {
    return {
      isSuccessful: false,
      message: "invalid token",
      errorCode: 400
    }
  }

  const user = await userService.getUserById(decoded.uid);
  if (!user) {
    return {
      isSuccessful: false,
      message: "user not found",
      errorCode: 404
    }
  }

  if (user.is_valid) {
    return {
      isSuccessful: true,
      message: "email already verified",
      errorCode: 200
    }
  }

  await db<UserEntity>("users").where("user_id", decoded.uid).update({
    is_valid: true
  });

  return {
    isSuccessful: true,
    message: "email verified",
    errorCode: 200
  }
}

function refreshToken(rft: string): TBaseDto<TCookieData> {
  try {
    const decoded = jwt.verify(rft, process.env.JWT_SECRET || 'secret') as TPayload;
    const payload: TPayload = {
      uid: decoded.uid,
      email: decoded.email,
      uname: decoded.uname
    }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: appConst.EXPIRES_ACCESS_TOKEN_IN
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: appConst.EXPIRES_REFRESH_TOKEN_IN
    });

    return {
      isSuccessful: true,
      message: "refresh token success",
      data: {
        act: accessToken,
        rft: refreshToken,
        uid: decoded.uid
      },
      errorCode: 200
    }
  } catch (error: JWTError | any) {
    return {
      isSuccessful: false,
      message: error.message,
      errorCode: 401
    }
  }
}

async function resendVerificationEmail(email: string): Promise<TBaseDto<undefined>> {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return {
      isSuccessful: false,
      message: "email not found",
      errorCode: 404
    }
  }

  const payload: TPayload = {
    uid: user.user_id,
    email: user.email,
    uname: user.name
  }

  if (user.is_valid) {
    return {
      isSuccessful: false,
      message: "email already verified",
      errorCode: 400
    }
  }

  return mailService.sendEmailVerification(payload, appConst.TEMPLATE_EMAIL.VERIFICATION);
}

export default {
  loginByEmail,
  registerByEmail,
  verifyEmail,
  refreshToken,
  resendVerificationEmail
}