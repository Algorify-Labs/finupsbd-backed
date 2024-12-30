import express from 'express'
import { AuthRouter } from '../module/auth/auth.route'
const router = express.Router()



const moduleRouter = [
    {
        path: '/auth', 
        route: AuthRouter
    },
]



moduleRouter.forEach(item => router.use(item.path, item.route))

export const RootRouter = router