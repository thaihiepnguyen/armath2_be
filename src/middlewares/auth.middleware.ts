import {NextFunction, Response, Request} from "express";
import {JWTError, TMetadata, TPayload} from "../app.typing.js";
import jwt from "jsonwebtoken";

function authenticate(req: Request, res: Response, next: NextFunction) {
  const act = req.headers.authorization?.split(' ')[1];
  const cookieAct = req.cookies['act'];
  if (!act && !cookieAct) {
    return res.status(401).json({
        message: "Unauthorized"
    });
  }
  try {
    const decoded = jwt.verify(act || cookieAct, process.env.JWT_SECRET || 'secret') as TPayload;
    req.body.metadata = {
      uid: decoded.uid,
      uname: decoded.uname
    } as TMetadata;
    next();
  } catch (error: JWTError | any) {
    return res.status(401).json({
      message: error.message
    });
  }
}


export default {
  authenticate
}