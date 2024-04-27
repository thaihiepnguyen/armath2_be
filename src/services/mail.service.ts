import nodemailer from "nodemailer";
import {TBaseDto, TPayload} from "../app.typing.js";
import appConst from "../app.const.js";
import jwt from "jsonwebtoken";
import {TemplateEmailEntity} from "../entities/templateEmail.entity.js";
import dbUtil from "../utils/db.util.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_NODE_MAILER,
    pass: process.env.PASS_NODE_MAILER,
  },
});

async function sendEmailVerification(payload: TPayload, templateId: number): Promise<TBaseDto<undefined>> {
  const emailTemplate = await dbUtil<TemplateEmailEntity>("email_templates").where("id", templateId).first();
  if (!emailTemplate) {
    return {
      isSuccessful: false,
      message: "Internal Error",
      errorCode: 500
    }
  }

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: appConst.EXPIRES_ACCESS_TOKEN_IN
  });

  await transporter.sendMail({
    from: "MathAr Unity Application <",
    to: `${payload.email}`,
    subject: "Verification Email",
    html: emailTemplate.content
      .replace("$user_name$", payload.uname)
      .replace("$url$", `${process.env.DOMAIN == 'local' ? process.env.SERVER_URL_LOCAL: process.env.SERVER_URL_DEV}`)
      .replace("$token$", accessToken),
  });
  return {
    isSuccessful: true,
    message: "Email has been sent to your email address. Please verify your email address.",
    errorCode: 200
  }
}




export default {
  sendEmailVerification
}