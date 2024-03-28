import {Response} from 'express';
import {TCookieData} from "../app.typing.js";
import appConst from "../app.const.js";
function setCookie(res: Response, data: TCookieData) {
  res.cookie("act", data.act, {
    httpOnly: false,
    maxAge: appConst.EXPIRES_COOKIE.IN7DAYS,
  })
  res.cookie("uid", data.uid, {
    httpOnly: false,
    maxAge: appConst.EXPIRES_COOKIE.IN7DAYS,
  })
  res.cookie("rft", data.rft, {
    httpOnly: false,
    secure: true,
    maxAge: appConst.EXPIRES_COOKIE.IN30DAYS,
  })
}

function clearCookie(res: Response) {
  res.clearCookie("act");
  res.clearCookie("uid");
  res.clearCookie("rft");
}

export default {
  setCookie,
  clearCookie
}