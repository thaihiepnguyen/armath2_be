import { QuestionResultEntity } from "../entities/questionResult.entity.js";
import db from "../util/db.js";


async function getQuestionResultByTestResultId(testResultId: number): Promise<QuestionResultEntity[] | undefined> {
  return db<QuestionResultEntity>("question_result").where("test_result_id", testResultId);
}

async function getQuestionResultById(id: number): Promise<QuestionResultEntity | undefined> {
  return db<QuestionResultEntity>("question_result").where("question_result_id", id).first();
}
async function addQuestionResult(questionResult: QuestionResultEntity): Promise<QuestionResultEntity | undefined> {
    var response= await db<QuestionResultEntity>("question_result").insert(questionResult).returning("*");
    return response[0];
  }
export default {
    getQuestionResultByTestResultId,
    getQuestionResultById,
    addQuestionResult
}