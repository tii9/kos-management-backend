import prisma from "../../db/prisma";
import { UserType } from "../../types";

export const fetchUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  return user;
};

export const insertUser = async (data: UserType) => {
  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: data.password,
    },
    omit: {
      password: true,
    },
  });

  return user;
};
