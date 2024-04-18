import { UserAccountEntity } from "../entities/userAccount.entity.js";
import db from "../util/db.js";


async function getUserByEmail(email: string): Promise<UserAccountEntity | undefined> {
  return db<UserAccountEntity>("user_account").where("email", email).first();
}

async function getUserById(user_id: number): Promise<UserAccountEntity | undefined> {
  return db<UserAccountEntity>("user_account").where("user_id", user_id).first();
}

export default {
  getUserByEmail,
  getUserById
}