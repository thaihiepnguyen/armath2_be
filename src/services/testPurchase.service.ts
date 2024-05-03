import { TestPurchaseEntity } from "../entities/testPurchase.entity.js";
import db from "../util/db.js";


async function getByUserId(userId: number): Promise<TestPurchaseEntity[] | undefined> {
  return db<TestPurchaseEntity>("test_purchases").where("user_id", userId);
}

async function getById(id: number): Promise<TestPurchaseEntity | undefined> {
  return db<TestPurchaseEntity>("test_purchases").where("test_puchase_id", id).first();
}

export default {
  getByUserId,
  getById
}