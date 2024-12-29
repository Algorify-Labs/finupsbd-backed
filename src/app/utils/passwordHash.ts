import bcrypt from 'bcrypt'
import { ConfigFile } from '../../config'

export const passwordHash = async (password: string) => {
   
   const result = await bcrypt.hash(password, Number(ConfigFile.BCRYPT_SALT_ROUNDS))
   return result
}