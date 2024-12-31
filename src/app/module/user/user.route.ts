import express from "express"
import { UserController } from "./user.controller"
import auth from "../../middleware/auth"

const router = express.Router()



router.get('/', auth("USER"), UserController.getAllUsers)

router.get('/my-profile', auth("USER", "ADMIN"), UserController.meProfile)

// router.get('/:id', )
// router.patch('/login',)
// router.delete('/login', )

export const UserRouter = router