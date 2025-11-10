import { Request, Response } from "express";
import { createUser, getUserByUsername } from "./auth.service";
import { UserType } from "../../types";
import { payload, generateToken } from "../../utils";

export const getUserByUsernameController = async (
  req: Request<{}, {}, UserType>,
  res: Response
) => {
  try {
    const data = req.body;

    const user = await getUserByUsername(data);

    const token = generateToken({
      id: user.id,
      username: user.username,
    });

    console.log("berhasil mengambil data user");

    payload(res, 200, "berhasil mengambil data user", user, token);
  } catch (error: any) {
    console.log(error);

    if (error instanceof Error) {
      if (error.message.includes("tidak ditemukan")) {
        payload(res, 404, error.message);
      }

      if (error.message.includes("password salah")) {
        payload(res, 401, error.message);
      }

      payload(res, 400, error.message);
    }

    payload(res, 500, "terjadi kesalahan server");
  }
};

export const createUserController = async (
  req: Request<{}, {}, UserType>,
  res: Response
) => {
  try {
    const data = req.body;
    const user = await createUser(data);

    console.log("berhasil menambahkan user");

    payload(res, 201, "berhasil menambahkan user", user);
  } catch (error: any) {
    console.log(error.message);

    if (error.message.includes("username sudah digunakan")) {
      payload(res, 409, error.message);
    }

    if (error.message.includes("tidak boleh kosong")) {
      payload(res, 400, error.message);
    }

    payload(res, 500, "terjadi kesalahan pada server");
  }
};
