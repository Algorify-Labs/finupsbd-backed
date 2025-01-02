import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponce from '../../utils/sendResponce';

const signUp = catchAsync(async (req, res) => {
  const result = await AuthServices.signUp(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'You have been successfully registered.',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const validatePin = catchAsync(async (req, res) => {
  const result = await AuthServices.validatePin(req.body);

  //   res.status(StatusCodes.CREATED).json({
  //     success: true,
  //     message: 'User verify successfully please Login',
  //     statusCode: StatusCodes.CREATED,
  //     data: result,
  //   });
  sendResponce(res, StatusCodes.CREATED, 'User verify successfully', result);
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'User login successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body);

  sendResponce(
    res,
    StatusCodes.OK,
    'check your email for verification!',
    result
  );
});

const resetPassword = catchAsync(async (req, res) => {
    console.log(req.body);
  const result = await AuthServices.resetPassword(req.body);

  sendResponce(
    res,
    StatusCodes.OK,
    'Password Reset successfully please login',
    result
  );
});

export const AuthController = {
  signUp,
  validatePin,
  login,
  forgetPassword,
  resetPassword,
};
