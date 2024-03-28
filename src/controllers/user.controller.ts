import {NextFunction, Request, Response} from 'express';

function findUserById(req: Request, res: Response, next: NextFunction): any {
  const { id } = req.params;
  const { metadata } = req.body;

  return res.status(200).json({
    message: `User id ${id} is found`
  });
}

export default {
  findUserById
}