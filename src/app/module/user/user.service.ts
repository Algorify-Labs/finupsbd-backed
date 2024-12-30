import { prisma } from '../../../app';

const getAllUser = async () => {
  const result = await prisma.user.findMany();

  return result;
};

export const UserServices = {
  getAllUser,
};
