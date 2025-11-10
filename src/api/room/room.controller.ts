import { Request, Response } from "express";
import {
  createNewRoom,
  deleteRoomById,
  editRoomById,
  getAllRoom,
  getRoomById,
} from "./room.service";
import { payload } from "../../utils";
import { RoomType } from "../../types";

export const getAllRoomController = async (req: Request, res: Response) => {
  try {
    const room = await getAllRoom();

    console.log("mengambil semua data kamar");
    payload(res, 200, "berhasil mengambil semua data kamar", room);
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("tidak ada")) {
        payload(res, 404, error.message);
      }
    }
    console.log(error.message);
    payload(res, 500, "server error");
  }
};

export const getRoomByIdController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const room = await getRoomById(id);

    console.log(`mengambil data kamar ${room.room_number}`);
    payload(
      res,
      200,
      `berhasil mengambil data kamar ${room.room_number}`,
      room
    );
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("tidak ditemukan")) {
        payload(res, 404, error.message);
      }
    }

    console.log(error.message);
    payload(res, 500, "server error");
  }
};

export const createNewRoomController = async (
  req: Request<{}, {}, RoomType>,
  res: Response
) => {
  try {
    const data = req.body;
    const room = await createNewRoom(data);

    console.log("berhasil membuat data kamar baru");
    payload(res, 201, "berhasil membuat data kamar baru", room);
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("wajib diisi")) {
        payload(res, 400, error.message);
      }

      if (error.message.includes("sudah ada")) {
        payload(res, 409, error.message);
      }
    }

    console.log(error.message);
    payload(res, 500, "server error");
  }
};

export const deleteRoomByIdController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const room = await deleteRoomById(id);

    console.log(`berhasil menghapus kamar ${room.room_number}`);
    payload(res, 200, `berhasil menghapus kamar ${room.room_number}`, room);
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("tidak ditemukan")) {
        payload(res, 404, error.message);
      }
    }
    console.log(error.message);
    payload(res, 500, "server error");
  }
};

export const editRoomByIdController = async (
  req: Request<{ id: string }, {}, RoomType>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const room = await editRoomById(id, data);
    console.log(`mengubah data kamar ${room.room_number}`);
    payload(res, 200, `berhasil mengubah data kamar ${room.room_number}`, room);
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("tidak ditemukan")) {
        payload(res, 404, error.message);
      }

      if (error.message.includes("wajib diisi")) {
        payload(res, 400, error.message);
      }
    }
    console.log(error.message);
    payload(res, 500, "server error");
  }
};
