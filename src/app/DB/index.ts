import { prisma } from "../../app"
import bcrypt from "bcrypt"
import { ConfigFile } from "../../config"
import { Prisma } from "@prisma/client"
import { generateUserId } from "../utils/generateUserId"



const superUser: Prisma.UserCreateInput = {
  name: 'Md Rasel',
  userId: "",
  email: ConfigFile.SUPER_ADMIN_EMAIL!,
  phone: '01719185563',
  password: ConfigFile.SUPER_ADMIN_PASSWORD as string,
  role: 'SUPER_ADMIN',
  emailVerified: true,
}



const seedSuperAdmin = async () => {
  try {
    superUser.userId = await generateUserId()
    const passwordHash = await bcrypt.hash(ConfigFile.SUPER_ADMIN_PASSWORD as string, Number(ConfigFile.BCRYPT_SALT_ROUNDS))
    superUser.password = passwordHash
    const isSuperAdmin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } })
    if (!isSuperAdmin) {
      await prisma.user.create({ data: superUser })
    }
  } catch (error) {
    console.log(`Super admin create fil ${error}`)
  }
}


export default seedSuperAdmin