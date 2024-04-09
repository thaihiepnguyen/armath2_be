import { LessonEntity } from "../entities/lesson.entity.js";
import db from "../util/db.js";


async function getLessonByChapter(chapter: string): Promise<LessonEntity[] | undefined> {
  return db<LessonEntity>("lessons").where("chapter", chapter);
}

async function getAllChapter(): Promise<String[] | undefined> {
  return db<String>("lessons").select("chapter").distinct().orderBy("chapter");
}

export default {
    getLessonByChapter,
    getAllChapter
}