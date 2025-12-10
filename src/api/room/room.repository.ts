import prisma from "../../db/prisma";
import { RoomType } from "../../types";

export const fetchAllRooms = async () => {
  const room = await prisma.room.findMany();

  return room;
};

export const fetchRoomById = async (id: string) => {
  const room = await prisma.room.findUnique({
    where: {
      id,
    },
  });

  return room;
};

export const fetchAvailableRoom = async () => {
  const room = await prisma.room.findMany({
    where: {
      is_available: true,
    },
  });

  return room;
};

export const fetchRoomByRoomNumber = async (room_number: string) => {
  const room = await prisma.room.findUnique({
    where: {
      room_number,
    },
  });

  return room;
};

export const insertNewRoom = async (data: RoomType) => {
  const room = await prisma.room.create({
    data: {
      room_number: data.room_number,
      price_per_month: data.price_per_month,
    },
  });

  return room;
};

export const dropRoomById = async (id: string) => {
  const room = await prisma.room.delete({
    where: {
      id,
    },
  });

  return room;
};

export const updateRoomById = async (id: string, data: RoomType) => {
  const room = await prisma.room.update({
    where: { id },
    data: {
      room_number: data.room_number,
      price_per_month: data.price_per_month,
      is_available: data.is_available,
    },
  });

  return room;
};

export const updateRoomStatusById = async (
  id: string,
  is_available: boolean
) => {
  const room = await prisma.room.update({
    where: { id },
    data: {
      is_available,
    },
  });

  return room;
};
