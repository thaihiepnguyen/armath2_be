import {Request, Response} from 'express';
import lessonService from "../services/lesson.service.js";
import numberUtil from "../utils/number.util.js";

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

async function getChapterBySemester(req: Request, res: Response): Promise<any> {
  try {
    const semester = req.params.semester;
    if (!numberUtil.isNumberString(semester) ){
      return res.status(400).json({
        message: `Semester must be a number`
      });
    }
    const chapters = await lessonService.getChapterBySemester(+semester);

    return res.status(200).json({
      message: chapters ? `All chapters are found` : `All chapters are not found`,
      data: chapters
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
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
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
  
}
async function getVideoByLessonId(req: Request, res: Response): Promise<any> {
  try {
    const { lessonId } = req.body;
    if (!numberUtil.isNumberString(lessonId) ){
      return res.status(400).json({
        message: `LessonId must be a number`
      });
    }
    const video = await lessonService.getVideoByLessonId(+lessonId);

    return res.status(200).json({
      message: video ? `Video is found` : `Video is not found`,
      data: video
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
  
}
async function getBookByLessonId(req: Request, res: Response): Promise<any> {
  try {
    const { lessonId } = req.body;
    if (!numberUtil.isNumberString(lessonId) ){
      return res.status(400).json({
        message: `LessonId must be a number`
      });
    }
    const book = await lessonService.getBookByLessonId(+lessonId);

    return res.status(200).json({
      message: book ? `Book is found` : `Book is not found`,
      data: book
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
  
}
export default {
    getAllChapter,
    getLessonByChapter,
    getBookByLessonId,
    getVideoByLessonId,
    getChapterBySemester
}
