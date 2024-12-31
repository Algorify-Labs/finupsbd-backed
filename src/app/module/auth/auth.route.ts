import express from "express"
import { AuthController } from "./auth.controller"
import validateRequest from "../../middleware/validateRequest"
import { UserValidation } from "../user/user.validation"

const router = express.Router()



router.post('/signUp', validateRequest(UserValidation.createUserValidationSchema), AuthController.signUp)
router.post('/validate-pin', validateRequest(UserValidation.verifyPinValidationSchema), AuthController.validatePin)

router.post('/login', validateRequest(UserValidation.loginValidationSchema), AuthController.login)


export const AuthRouter = router