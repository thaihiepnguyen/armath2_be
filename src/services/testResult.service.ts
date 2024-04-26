import { TestResultEntity } from "../entities/testResult.entity.js";
import db from "../util/db.js";


async function getTestResultByUserId(userId: number): Promise<TestResultEntity[] | undefined> {
  return db<TestResultEntity>("test_result").where("user_id", userId);
}

async function getTestResultById(id: number): Promise<TestResultEntity | undefined> {
  return db<TestResultEntity>("test_result").where("test_result_id", id).first();
}
async function addTestResult(testResult: TestResultEntity): Promise<TestResultEntity | undefined> {
    var response= await db<TestResultEntity>("test_result").insert(testResult).returning("*");
    return response[0];
  }
export default {
    getTestResultByUserId,
    getTestResultById,
    addTestResult
}