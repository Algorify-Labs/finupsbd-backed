import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import { UserServices } from "./user.service"



const getAllUsers = catchAsync(async (req, res) => {

    const result = await UserServices.getAllUser()
    
    res.status(StatusCodes.OK).json({
        success: true, 
        message: " retrieve all user  successfully.",
        statusCode: StatusCodes.OK,
        data: result
    })
})






export const UserController = {
    getAllUsers,
}