import {Request, Response} from 'express';
import lessonService from "../services/lesson.service.js";

async function getLessonByChapter(req: Request, res: Response): Promise<any> {
  try {
    const { chapter } = req.body;
    const lessons = await lessonService.getLessonByChapter(chapter);

    return res.status(200).json({
      message: lessons ? `Chapter ${chapter} is found` : `Chapter ${chapter} is not found`,
      data: lessons
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
  
}
async function getAllChapter(req: Request, res: Response): Promise<any> {
  try {
    const chapters = await lessonService.getAllChapter();

    return res.status(200).json({
      message: chapters ? `All chapters are found` : `All chapters are not found`,
      data: chapters
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
  
}
async function getVideoByLessonId(req: Request, res: Response): Promise<any> {
  try {
    const { lessonId } = req.body;
    const video = await lessonService.getVideoByLessonId(lessonId);

    return res.status(200).json({
      message: video ? `Video is found` : `Video is not found`,
      data: video
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
  
}
async function getBookByLessonId(req: Request, res: Response): Promise<any> {
  try {
    const { lessonId } = req.body;
    const book = await lessonService.getBookByLessonId(lessonId);

    return res.status(200).json({
      message: book ? `Book is found` : `Book is not found`,
      data: book
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
  
}
export default {
    getAllChapter,
    getLessonByChapter,
    getBookByLessonId,
    getVideoByLessonId
}
