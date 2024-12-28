import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (req: Request, res: Response, next: NextFunction) => {

  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API Route not found please input valid route!",
  });
};

export default notFound;
