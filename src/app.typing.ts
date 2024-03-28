import {Request} from "express";

export type TBaseDto<T> = {
  data?: T;
  errorCode: number; // 200, 400, 500
  message: string;
  isSuccessful: boolean;
}

export type TPayload = {
  uid: number;
  email: string;
  uname: string;
}

export type TMetadata = {
  uid?: number;
  uname?: string;
}

export type JWTError = {
  message: string;
  name: string;
}