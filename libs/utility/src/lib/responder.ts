/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { getMessage } from './message';

export function successRespond(
  res: Response,
  msg: string,
  code: number,
  data: any,
  payload: {
    [key: string]: any;
  }
) {
  return res
    .status(code)
    .json({ success: true, code, message: getMessage(msg), data, ...payload })
    .end();
}
export function errorRespond(res: Response, msg: string, code: number) {
  return res
    .status(code)
    .json({ success: false, code, message: getMessage(msg) })
    .end();
}
