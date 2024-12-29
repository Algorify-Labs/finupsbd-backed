/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import { ConfigFile } from "../../config";
import {StatusCodes} from 'http-status-codes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err: any, req:Request, res: Response, next: NextFunction) => {

    let newMessage = "Something went's wrong"




    if(err?.name === "PrismaClientKnownRequestError"){
        newMessage = "Validation Error"
    }
    



    
    res.status(StatusCodes.BAD_GATEWAY).json({
        success: false, 
        message: newMessage,
        error: err, 
        stack: ConfigFile.NODE_ENV === "production" ?  null : err.stack
    })
}

export default globalErrorHandler