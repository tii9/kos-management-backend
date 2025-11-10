import { Response } from "express";

export const payload = (
  res: Response,
  status_code: number,
  message: string,
  data: any = [],
  token?: string
) => {
  res.status(status_code).send({
    data,
    message,
    status_code,
    token,
  });
};
