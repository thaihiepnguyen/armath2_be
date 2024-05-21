import {Request, Response} from 'express';
import questionResultService from "../services/questionResult.service.js";
import  numberUtil  from '../util/number.util.js';
import { QuestionResultEntity } from '../entities/questionResult.entity.js';

async function getQuestionResultByTestResultId(req: Request, res: Response): Promise<any> {
  try {
    const { testResultId } = req.params;
    const testResultIdNumber = Number(testResultId);
    if (!numberUtil.isNumberString(testResultId) ){
      return res.status(400).json({
        message: `Semester must be a number`
      });
    }
    const exercise = await questionResultService.getQuestionResultByTestResultId(testResultIdNumber);

    return res.status(200).json({
      message: exercise ? `Question Result with ${testResultId} is found` : `Question Result with ${testResultId} is not found`,
      data: exercise
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
}



  async function addQuestionResult(req: Request, res: Response): Promise<any> {
    try {
      var temp =  req.body;
      delete temp.question_result_id;
      const question_result = await questionResultService.addQuestionResult(temp);
  
      return res.status(200).json({
        message: question_result ? `Add success` : `Add failed`,
        data: question_result
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal error`
      });
    }

}

async function getById(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const idNumber = Number(id);
    if (!numberUtil.isNumberString(id) ){
      return res.status(400).json({
        message: `Semester must be a number`
      });
    }
    const question_result = await questionResultService.getQuestionResultById(idNumber);

    return res.status(200).json({
      message: question_result ? `Question result ${idNumber} is found` : `No Exercises are found`,
      data: question_result
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
}

export default {
    getById,
    getQuestionResultByTestResultId,
    addQuestionResult,
    

}
