import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.join(process.cwd(), '.env')
})


export const ConfigFile = {
    post: process.env.PORT
}