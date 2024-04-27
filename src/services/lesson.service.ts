import { LessonEntity } from "../entities/lesson.entity.js";
import db from "../utils/db.util.js";
import {ChapterEntity} from "../entities/chapter.entity.js";


async function getLessonByChapter(chapter: string): Promise<LessonEntity[] | undefined> {
  return db<LessonEntity>("lessons").select("lessons.*")
    .innerJoin('chapters', 'lessons.chapter_id', 'chapters.chapter_id')
    .where('chapters.name', chapter).orderBy("lesson_id");
}

async function getAllChapter(): Promise<ChapterEntity[] | undefined> {
  return db<ChapterEntity>("chapters")
    .select()
    .orderBy("chapter_id");
}

async function getVideoByLessonId(id: number): Promise<string[] | undefined> {
  return db<string>("lessons")
    .select('video_url')
    .where("lesson_id", id);
}

async function getBookByLessonId(id: number): Promise<string[] | undefined> {
  return db<string>("lessons")
    .select('book_url')
    .where("lesson_id", id);
}


async function getChapterBySemester(semester: number): Promise<string[] | undefined> {
  return db<string>("chapters")
    .select("name")
    .where("semester",semester)
    .orderBy("chapter_id");
}


export default {
    getLessonByChapter,
    getAllChapter,
    getVideoByLessonId,
    getBookByLessonId,
    getChapterBySemester,
}