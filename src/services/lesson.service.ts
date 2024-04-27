import { LessonEntity } from "../entities/lesson.entity.js";
import dbUtil from "../utils/db.util.js";
import {ChapterEntity} from "../entities/chapter.entity.js";


async function getLessonByChapter(chapter: string): Promise<LessonEntity[] | undefined> {
  return dbUtil<LessonEntity>("lessons").select("lessons.*")
    .innerJoin('chapters', 'lessons.chapter_id', 'chapters.chapter_id')
    .where('chapters.name', chapter).orderBy("lesson_id");
}

async function getAllChapter(): Promise<ChapterEntity[] | undefined> {
  return dbUtil<ChapterEntity>("chapters")
    .select()
    .orderBy("chapter_id");
}

async function getVideoByLessonId(id: number): Promise<string[] | undefined> {
  return dbUtil<string>("lessons")
    .select('video_url')
    .where("lesson_id", id);
}

async function getBookByLessonId(id: number): Promise<string[] | undefined> {
  return dbUtil<string>("lessons")
    .select('book_url')
    .where("lesson_id", id);
}


async function getChapterBySemester(semester: number): Promise<string[] | undefined> {
  return dbUtil<string>("chapters")
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