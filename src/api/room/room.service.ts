import { RoomType } from "../../types";
import {
  dropRoomById,
  fetchAllRooms,
  fetchRoomById,
  fetchRoomByRoomNumber,
  insertNewRoom,
  updateRoomById,
} from "./room.repository";

export const getAllRoom = async () => {
  const room = await fetchAllRooms();

  if (!room.length)
    throw new Error("tidak ada data, silahkan menambahkan data");

  return room;
};

export const getRoomById = async (id: string) => {
  const room = await fetchRoomById(id);

  if (!room) throw new Error("data kamar tidak ditemukan");

  return room;
};

export const createNewRoom = async (data: RoomType) => {
  if (!data.room_number || !data.price_per_month) {
    throw new Error("nomor kamar dan harga wajib diisi");
  }

  const existingRoomNumber = await fetchRoomByRoomNumber(data.room_number);
  if (existingRoomNumber) {
    throw new Error("nomor kamar sudah ada");
  }

  const room = await insertNewRoom(data);

  return room;
};

export const deleteRoomById = async (id: string) => {
  await getRoomById(id);

  const room = await dropRoomById(id);

  return room;
};

export const editRoomById = async (id: string, data: RoomType) => {
  if (!data.room_number || !data.price_per_month) {
    throw new Error("Nomor kamar dan harga wajib diisi");
  }

  await getRoomById(id);

  const room = await updateRoomById(id, data);

  return room;
};
