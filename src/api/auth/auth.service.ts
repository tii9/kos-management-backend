import bcrypt from "bcryptjs";
import { UserType } from "../../types";
import { fetchUserByUsername, insertUser } from "./auth.repository";

export const getUserByUsername = async (data: UserType) => {
  if (!data.username || !data.password) {
    throw new Error("username atau password tidak boleh kosong");
  }

  const user = await fetchUserByUsername(data.username);

  if (!user) throw new Error("username atau password salah");

  const validatePassword = await bcrypt.compare(data.password, user?.password);

  if (!validatePassword) {
    throw new Error("username atau password salah");
  }

  return {
    id: user.id,
    username: user.username,
  };
};

export const createUser = async (data: UserType) => {
  if (!data.username || !data.password) {
    throw new Error("username atau password tidak boleh kosong");
  }

  const { username, password } = data;

  const existingUser = await fetchUserByUsername(username);
  if (existingUser) {
    throw new Error("username sudah digunakan");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await insertUser({ username, password: hashPassword });

  if (!user) throw new Error("gagal menambahkan data");

  return user;
};
