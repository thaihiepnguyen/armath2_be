import {Request, Response} from 'express';
import testService from "../services/test.service.js";
import  numberUtil  from '../util/number.util.js';
import { TestEntity } from '../entities/test.entity.js';

async function getTestsBySemester(req: Request, res: Response): Promise<any> {
  try {
    const { semester } = req.params;
    const semesterNumber = Number(semester);
    if (!numberUtil.isNumberString(semester) ){
      return res.status(400).json({
        message: `Semester must be a number`
      });
    }
    const test_result = await testService.getTestsBySemester(semesterNumber);

    return res.status(200).json({
      message: test_result ? `Test  with ${semesterNumber} is found` : `Test  with ${semesterNumber} is not found`,
      data: test_result
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
    const test_result = await testService.getById(idNumber);

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
    getTestsBySemester,
    

}
