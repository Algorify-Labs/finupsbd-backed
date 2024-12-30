import express from "express"
import { UserController } from "./user.controller"
import auth from "../../middleware/auth"

const router = express.Router()



router.get('/', auth("ADMIN"), UserController.getAllUsers)



// router.get('/:id', )
// router.patch('/login',)
// router.delete('/login', )

export const UserRouter = router