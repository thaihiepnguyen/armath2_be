import { LessonEntity } from "../entities/lesson.entity.js";
import db from "../util/db.js";


async function getLessonByChapter(chapter: string): Promise<LessonEntity[] | undefined> {
  return db<LessonEntity>("lessons").where("chapter", chapter).orderBy("lesson_id");
}

async function getAllChapter(): Promise<String[] | undefined> {
  return db<String>("lessons").select("chapter").distinct().orderBy("chapter");
}

async function getVideoByLessonId(id: string): Promise<string[] | undefined> {
  return db<string>("lessons").where("lesson_id", id).select(['video_url']);
}

async function getBookByLessonId(id: string): Promise<string[] | undefined> {
  return db<string>("lessons").where("lesson_id", id).select(['book_url']);
}


export default {
    getLessonByChapter,
    getAllChapter,
    getVideoByLessonId,
    getBookByLessonId,
}