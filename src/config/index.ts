import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(process.cwd(), '.env')
})


export const ConfigFile = {
    NODE_ENV: process.env.NODE_ENV,
    post: process.env.PORT
}