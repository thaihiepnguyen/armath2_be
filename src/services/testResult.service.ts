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
async function getTestResultByUserIdAndTestId(userId: number, testId:number): Promise<TestResultEntity | undefined> {

  return db<TestResultEntity>("test_result").where("user_id", userId).andWhere("test_id", testId).orderBy("date","asc").first();
}
async function updateTestResult(testResult: TestResultEntity, test_result_id: number): Promise<TestResultEntity | undefined> {
  var response= await db<TestResultEntity>("test_result").where("test_result_id", test_result_id).update(testResult).returning("*");
  return response[0];
}
async function deleteByUserIdAndTestId(userId: number, testId:number): Promise<Number | undefined> {
  return db<TestResultEntity>("test_result").where("user_id", userId).andWhere("test_id", testId).delete();
}
export default {
    getTestResultByUserId,
    getTestResultById,
    addTestResult,
    getTestResultByUserIdAndTestId,
    updateTestResult,
    deleteByUserIdAndTestId,
}