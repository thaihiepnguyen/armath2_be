import {Request, Response} from 'express';
import testResultService from "../services/testResult.service.js";
import  numberUtil  from '../util/number.util.js';
import { TestResultEntity } from '../entities/testResult.entity.js';

async function getTestResultByUserId(req: Request, res: Response): Promise<any> {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    if (!numberUtil.isNumberString(userId) ){
      return res.status(400).json({
        message: `Semester must be a number`
      });
    }
    const test_result = await testResultService.getTestResultByUserId(userIdNumber);

    return res.status(200).json({
      message: test_result ? `Test Result with ${userIdNumber} is found` : `Question Result with ${userIdNumber} is not found`,
      data: test_result
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
}



  async function addTestResult(req: Request, res: Response): Promise<any> {
    try {
      var temp =  req.body;
      delete temp.test_result_id;
      
      const question_result = await testResultService.addTestResult(temp);
  
      return res.status(200).json({
        message: question_result ? `Add success` : `Add failed`,
        data: question_result
      });
    } catch (error) {
      console.log(error);
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
    const test_result = await testResultService.getTestResultById(idNumber);

    return res.status(200).json({
      message: test_result ? `Test result ${idNumber} is found` : `No test result are found`,
      data: test_result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal error`
    });
  }
}

export default {
    getById,
    getTestResultByUserId,
    addTestResult,

}
