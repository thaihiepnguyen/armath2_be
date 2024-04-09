import {Request, Response} from 'express';
import lessonService from "../services/lesson.service.js";

async function getLessonByChapter(req: Request, res: Response): Promise<any> {
  const { chapter } = req.body;

  const lessons = await lessonService.getLessonByChapter(chapter);

  return res.status(200).json({
    message: lessons ? `Chapter ${chapter} is found` : `Chapter ${chapter} is not found`,
    data: lessons
  });
}
async function getAllChapter(req: Request, res: Response): Promise<any> {
  const chapters = await lessonService.getAllChapter();

  return res.status(200).json({
    message: chapters ? `All chapters are found` : `All chapters are not found`,
    data: chapters
  });
}
async function getVideoByLessonId(req: Request, res: Response): Promise<any> {
  const { lessonId } = req.body;

  const video = await lessonService.getVideoByLessonId(lessonId);

  return res.status(200).json({
    message: video ? `Video is found` : `Video is not found`,
    data: video
  });
}
async function getBookByLessonId(req: Request, res: Response): Promise<any> {
  const { lessonId } = req.body;

  const book = await lessonService.getBookByLessonId(lessonId);

  return res.status(200).json({
    message: book ? `Book is found` : `Book is not found`,
    data: book
  });
}
export default {
    getAllChapter,
    getLessonByChapter,
    getBookByLessonId,
    getVideoByLessonId
}
