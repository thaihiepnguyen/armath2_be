import {Request, Response} from 'express';
import exerciseService from "../services/exercise.service.js";
import  numberUtil  from '../util/number.util.js';

async function getExerciseById(req: Request, res: Response): Promise<any> {
  try {
    const { exerciseId } = req.params;
    const exerciseIdNumber = Number(exerciseId);
    if (!numberUtil.isNumberString(exerciseId) ){
      throw new Error('exerciseId must be a number');
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
}async function getAllExercise(req: Request, res: Response): Promise<any> {
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

export default {
    getExerciseById,
    getAllExercise
}
