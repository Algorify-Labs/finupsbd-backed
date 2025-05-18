import express from "express"
import { UserBankAuthController } from "./userBankAuth.controller"
import { UserBankAuthValidation } from "./userBankAuth.validation"
import validateRequest from "../../../middleware/validateRequest"
import { bankAuth } from "../../../middleware/userBankAuth"

const router = express.Router()


router.post("/regiater", validateRequest(UserBankAuthValidation.userBankSchemaRegister), UserBankAuthController.userBankRegister)
router.post("/login", validateRequest(UserBankAuthValidation.userBankSchemaLogin), UserBankAuthController.userBankLogin)
router.get("/me", bankAuth("BANK_USER"), UserBankAuthController.me)



export const UserBankAuthRouter = router    