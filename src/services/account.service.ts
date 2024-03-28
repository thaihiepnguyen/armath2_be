import db from "../util/db.js";
import { generateUsername } from "unique-username-generator";
import {TBaseDto} from "../app.typing.js";
import * as bcrypt from "bcrypt";

async function isEmailExist(email: string): Promise<boolean> {
  return !! await db("users").where("email", email).first();
}

async function loginByEmail(email: string, password: string): Promise<TBaseDto<any>> {
  if (!await isEmailExist(email)) {
    return {
      isSuccessful: false,
      message: "email not found",
      errorCode: 404
    }
  }

  const user = await db("users").where("email", email).first();

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return {
      isSuccessful: false,
      message: "password is incorrect",
      errorCode: 400
    }
  }

  delete user.password;
  return {
    isSuccessful: true,
    message: "login success",
    data: user,
    errorCode: 200
  }
}

async function registerByEmail(email: string, password: string): Promise<TBaseDto<number>> {
  if (await isEmailExist(email)) {
    return {
      isSuccessful: false,
      message: "email already exist",
      errorCode: 400
    }
  }

  password = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS as string) || 10);
  try {
    const newUser = await db("users").insert({
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