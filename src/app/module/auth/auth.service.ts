import { prisma } from "../../../app";
import { TUser } from "../user/user.interface";

const signUp = async (payload: TUser) => {

    console.log(payload);
    const result = await prisma.user.create({
        data: {
            "name": "shamim Reza",
            "email": "reza1@gmail.com",
            "phone": "01910479167",
            "password": "123456"
        }
    })
    return result
}



export const AuthServices = {
    signUp
}