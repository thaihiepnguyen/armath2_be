import { UserAccountEntity } from "../entities/userAccount.entity.js";
import db from "../utils/db.util.js";


async function getUserByEmail(email: string): Promise<UserAccountEntity | undefined> {
  return db<UserAccountEntity>("user_account").where("email", email).first();
}

async function getUserById(user_id: number): Promise<UserAccountEntity | undefined> {
  return db<UserAccountEntity>("user_account").where("user_id", user_id).first();
}

async function getCoinByUserId(user_id: number): Promise<number | undefined> {
  const data = await db<UserAccountEntity>("user_account").select("coin").where("user_id", user_id).first();
  return data?.coin;
}

export default {
  getUserByEmail,
  getUserById,
  getCoinByUserId
}