import { Request, Response } from 'express';
import testResultService from "../services/testResult.service.js";
import numberUtil from '../util/number.util.js';
import { TestResultEntity } from '../entities/testResult.entity.js';
import { get } from 'https';

async function getTestResultByUserId(req: Request, res: Response): Promise<any> {
  try {
    const { metadata } = req.body;
    const userId = metadata?.uid;
    const userIdNumber = Number(userId);
    if (!numberUtil.isNumberString(userId)) {
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
    var temp = req.body;
    delete temp.test_result_id;
    var { metadata } = req.body;
    var user_id = metadata.uid;
    delete temp.metadata
    temp.user_id = user_id;
    const del_response = await testResultService.deleteByUserIdAndTestId(temp.user_id, temp.test_id);
    const test_result = await testResultService.addTestResult(temp);
    return res.status(200).json({
      message: test_result ? `Add success` : `Add failed`,
      data: test_result
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
    if (!numberUtil.isNumberString(id)) {
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

    return res.status(500).json({
      message: `Internal error`
    });
  }
}
async function getTestResultByUserIdAndTestId(req: Request, res: Response): Promise<any> {
  try {
    var { testId } = req.query;

    if (!testId) {

      return res.status(400).json({
        message: `userId and testId are required`
      });
    }
    const { metadata } = req.body;
    const userId = metadata?.uid;
    const userIdNumber = Number(userId);
    const testIdNumber = Number(testId);

    const test_result = await testResultService.getTestResultByUserIdAndTestId(userIdNumber, testIdNumber);
    console.log(test_result);
    if (test_result == null) {
    }
    return res.status(200).json({
      message: test_result ? `Test result of user ${userIdNumber} and test id was ${testIdNumber} is found` : `No test result are found`,
      data: test_result
    });

  } catch (error) {
    return res.status(500).json({
      message: `Internal error`
    });
  }
}
export default {
  getById,
  getTestResultByUserId,
  addTestResult,
  getTestResultByUserIdAndTestId,

}
