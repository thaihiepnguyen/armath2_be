import {UserLoginDataEntity} from "../entities/userLoginData.entity.js";
import dbUtil from "../utils/db.util.js";


async function getUserByEmail(email: string): Promise<UserLoginDataEntity | undefined> {
  return dbUtil<UserLoginDataEntity>("user_login_data").where("email", email).first();
}

async function getUserById(user_id: number): Promise<UserLoginDataEntity | undefined> {
  return dbUtil<UserLoginDataEntity>("user_login_data").where("user_id", user_id).first();
}

export default {
  getUserByEmail,
  getUserById
}