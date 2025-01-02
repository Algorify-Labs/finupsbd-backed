/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';


const sendResponce = (res: Response, statusCode: number, message: string, data: any) => {

  res.status(statusCode).json({
    success: true,
    message: message,
    statusCode: statusCode,
    data: data
  })

};

export default sendResponce
