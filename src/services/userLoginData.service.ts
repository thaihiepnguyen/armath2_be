import {UserLoginDataEntity} from "../entities/userLoginData.entity.js";
import db from "../util/db.js";


async function getUserByEmail(email: string): Promise<UserLoginDataEntity | undefined> {
  return db<UserLoginDataEntity>("user_login_data").where("email", email).first();
}

async function getUserById(user_id: number): Promise<UserLoginDataEntity | undefined> {
  return db<UserLoginDataEntity>("user_login_data").where("user_id", user_id).first();
}

export default {
  getUserByEmail,
  getUserById
}