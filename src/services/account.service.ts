import db from "../util/db.js";
import {generateUsername} from "unique-username-generator";
import {TBaseDto, TMetadata, TPayload} from "../app.typing.js";
import * as bcrypt from "bcrypt";
import {UserEntity} from "../entities/user.entity.js";
import jwt from "jsonwebtoken";
import appConst from "../app.const.js";
import {TemplateEmailEntity} from "../entities/templateEmail.entity.js";
import nodemailer from "nodemailer";

async function getUserByEmail(email: string): Promise<UserEntity | undefined> {
  return db<UserEntity>("users").where("email", email).first();
}

async function loginByEmail(email: string, password: string): Promise<TBaseDto<any>> {
  const user: UserEntity | undefined = await getUserByEmail(email);
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

  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: appConst.EXPIRES_ACCESS_TOKEN_IN
  });

  return {
    isSuccessful: true,
    message: "login success",
    data: {
      act: token
    },
    errorCode: 200
  }
}

async function registerByEmail(email: string, password: string): Promise<TBaseDto<number>> {
  const user: UserEntity | undefined = await getUserByEmail(email);
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

    const emailTemplate = await db<TemplateEmailEntity>("email_templates").where("name", "email_verification").first();
    if (!emailTemplate) {
      return {
        isSuccessful: false,
        message: "Internal Error",
        errorCode: 500
      }
    }
    const user = await db<UserEntity>("users").where("user_id", newId).first();
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
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: appConst.EXPIRES_ACCESS_TOKEN_IN
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_NODE_MAILER,
        pass: process.env.PASS_NODE_MAILER,
      },
    });

    await transporter.sendMail({
      from: "MathAr Unity Application <",
      to: `${user.email}`,
      subject: "Verification Email",
      html: emailTemplate.content
        .replace("$user_name$", user.name)
        .replace("$url$", `${process.env.SERVER_URL_LOCAL}:${process.env.PORT}`)
        .replace("$token$", token),
    });

    return {
      message: "Email has been sent to your email address. Please verify your email address.",
      isSuccessful: true,
      errorCode: 200
    }
  } catch (error) {
    return {
      message: "register failed",
      isSuccessful: false,
      errorCode: 500
    }
  }
}

async function verifyEmail(token: string): Promise<TBaseDto<undefined>> {
  const decoded = jwt.verify(token as string, process.env.JWT_SECRET || 'secret') as TPayload;
  const user = await db<UserEntity>("users").where("user_id", decoded.uid).first();
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

export default {
  loginByEmail,
  registerByEmail,
  verifyEmail
}