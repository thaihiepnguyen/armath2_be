import {Request, Response} from 'express';
import lessonService from "../services/lesson.service.js";
import numberUtil from "../util/number.util.js";
import { get } from 'https';
import { TBaseDto } from '../app.typing.js';

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
async function getLessonById(req: Request, res: Response): Promise<any> {
  try {
    console.log(req.params);
    const { lessonId } = req.params;
    console.log(lessonId);
    const lessonIdNumber= Number(lessonId);
    if (!numberUtil.isNumberString(lessonId) ){
      return res.status(400).json({
        message: `LessonId must be a number`
      });
    }
    const video = await lessonService.getByLessonId(lessonIdNumber);

    return res.status(200).json({
      message: video ? `Video are found` : `Video is not found`,
      data: video
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function getImagesById(req: Request, res: Response): Promise<any> {
  try {
    const { lessonId } = req.params;
    const lessonIdNumber= Number(lessonId);
    if (!numberUtil.isNumberString(lessonId) ){
      return res.status(400).json({
        message: `LessonId must be a number`,
        isSuccessful: false
      });
    }
    const imageIds = await lessonService.getImagesById(lessonIdNumber);

    return res.status(200).json({
      message: imageIds ? `Images are found` : `Images are not found`,
      isSuccessful: true,
      data: imageIds
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      isSuccessful: false,
    });
  }
}

export default {
    getAllChapter,
    getLessonByChapter,
    getBookByLessonId,
    getImagesById,
    getChapterBySemester,
    getLessonById,
}
