import {Request, Response} from 'express';
import lessonService from "../services/lesson.service.js";

async function getLessonByChapter(req: Request, res: Response): Promise<any> {
  const { chapter } = req.params;

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
export default {
    getAllChapter,
    getLessonByChapter
}
