import e, {Request, Response} from 'express';
import testPurchaseService from "../services/testPurchase.service.js";
import  numberUtil  from '../util/number.util.js';
import { TestPurchaseEntity } from '../entities/testPurchase.entity.js';
import { get } from 'http';

async function getByUserId(req: Request, res: Response): Promise<any> {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    if (!numberUtil.isNumberString(userId) ){
      return res.status(400).json({
        message: `User ID must be a number`
      });
    }
    const test_result = await testPurchaseService.getByUserId(userIdNumber);

    return res.status(200).json({
      message: test_result ? `Tests  of user ${userIdNumber} is found` : `Tests  of user ${userIdNumber} is not found`,
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
    const test_result = await testPurchaseService.getById(idNumber);

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
    getByUserId,
    

}
