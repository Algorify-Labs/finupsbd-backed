import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import { AuthServices } from "./auth.service"


const signUp = catchAsync(async (req, res) => {
   
    const result = await AuthServices.signUp(req.body)
    
    res.status(StatusCodes.CREATED).json({
        success: true, 
        message: "You have been successfully registered.",
        statusCode: StatusCodes.CREATED,
        data: result
    })
})


export const AuthController = {
    signUp
}