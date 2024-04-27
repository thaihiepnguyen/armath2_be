import {Request, Response} from 'express';
import exerciseService from "../services/exercise.service.js";
import  numberUtil  from '../utils/number.util.js';

async function getExerciseById(req: Request, res: Response): Promise<any> {
  try {
    const { exerciseId } = req.params;
    const exerciseIdNumber = Number(exerciseId);
    if (!numberUtil.isNumberString(exerciseId) ){
      return res.status(400).json({
        message: `Semester must be a number`
      });
    }
    const exercise = await exerciseService.getExerciseById(exerciseIdNumber);

    return res.status(200).json({
      message: exercise ? `Exercise ${exerciseId} is found` : `Exercise ${exerciseId} is not found`,
      data: exercise
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
}



async function getExerciseByType(req: Request, res: Response): Promise<any> {
  try {
    const { type }  = req.body;
    const exercise = await exerciseService.getExerciseByType(type);

    return res.status(200).json({
      message: exercise ? `Exercise ${type} is found` : `Exercise ${type} is not found`,
      data: exercise
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
}

async function getAllExercise(req: Request, res: Response): Promise<any> {
  try {

    const exercises = await exerciseService.getAllExercise();

    return res.status(200).json({
      message: exercises ? `All Exercises are found` : `No Exercises are found`,
      data: exercises
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
}
async function getExercisesByLessonId(req: Request, res: Response): Promise<any> {
  try {
    const { lessonId } = req.params;
    const lessonIdNumber = Number(lessonId);
    if (!numberUtil.isNumberString(lessonId) ){
      throw new Error('exerciseId must be a number');
    }
    const exercise = await exerciseService.getAllExerciseByLessonId(lessonIdNumber);
    if(!exercise || exercise.length === 0){
      return res.status(404).json({
        message: `Exercises are not found`,
        
      });
    }
    return res.status(200).json({
      message: exercise ? `Exercises with lesson id:${lessonId} are found` : `Exercises with lesson id:${lessonId} are not found`,
      data: exercise
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
}
async function getExercisesByTestId(req: Request, res: Response): Promise<any> {
  try {
    const { testId } = req.params;
    const testIdNumber = Number(testId);
    if (!numberUtil.isNumberString(testId) ){
      throw new Error('exerciseId must be a number');
    }
    const exercise = await exerciseService.getAllExerciseByTestId(testIdNumber);
    if(!exercise || exercise.length === 0){
      return res.status(404).json({
        message: `Exercises are not found`,
        
      });
    }
    return res.status(200).json({
      message: exercise ? `Exercises with test id:${testId} are found` : `Exercises with test id:${testId} are not found`,
      data: exercise
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
}
export default {
    getExerciseById,
    getAllExercise,
    getExercisesByLessonId,
    getExercisesByTestId,
    getExerciseByType
}
