import db from "../util/db.js";
import {generateUsername} from "unique-username-generator";
import {TBaseDto, TPayload} from "../app.typing.js";
import * as bcrypt from "bcrypt";
import {UserEntity} from "../entities/user.entity.js";
import jwt from "jsonwebtoken";
import appConst from "../app.const.js";

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
      uid: user.user_id,
      uname: user.name,
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

    return {
      message: "register success",
      isSuccessful: true,
      data: newId,
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

export default {
  loginByEmail,
  registerByEmail
}