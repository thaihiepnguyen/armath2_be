import { TestEntity } from "../entities/test.entity.js";
import db from "../util/db.js";


async function getTestsBySemester(semester: number): Promise<TestEntity[] | undefined> {
  return db<TestEntity>("tests").where("semester", semester).orderBy("test_id","asc");
}

async function getById(id: number): Promise<TestEntity | undefined> {
  return db<TestEntity>("tests").where("test_id", id).first();
}

export default {
  getTestsBySemester,
  getById
}