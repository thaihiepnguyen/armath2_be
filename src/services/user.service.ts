import {UserEntity} from "../entities/user.entity.js";
import db from "../util/db.js";


async function getUserByEmail(email: string): Promise<UserEntity | undefined> {
  return db<UserEntity>("users").where("email", email).first();
}

async function getUserById(user_id: number): Promise<UserEntity | undefined> {
  return db<UserEntity>("users").where("user_id", user_id).first();
}

export default {
  getUserByEmail,
  getUserById
}