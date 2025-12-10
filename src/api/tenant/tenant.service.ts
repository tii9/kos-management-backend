import { TenantType } from "../../types";
import { editRoomById, updateRoomStatus } from "../room/room.service";
import {
  dropTenantById,
  fetchAllTenants,
  fetchTenantById,
  insertTenant,
  updateTenantById,
} from "./tenant.repository";

export const getAllTenants = async () => {
  const tenant = await fetchAllTenants();

  if (!tenant.length)
    throw new Error("tidak ada data, silahkan menambakan data");

  return tenant;
};

export const getTenantById = async (id: string) => {
  const tenant = await fetchTenantById(id);

  if (!tenant) throw new Error("data penyewa tidak ditemukan");

  return tenant;
};

export const createNewTenant = async (data: TenantType) => {
  if (!data.name || !data.phone) {
    throw new Error("nama dan no hp penyewa wajib diisi");
  }

  const room = await insertTenant(data);

  return room;
};

export const deleteTenantById = async (id: string) => {
  await getTenantById(id);

  const tenant = await dropTenantById(id);

  return tenant;
};

export const editTenantById = async (id: string, data: TenantType) => {
  if (!data.name || !data.phone) {
    throw new Error("nama dan no hp penyewa wajib diisi");
  }

  const tenant = await getTenantById(id);
  if (!tenant) {
    throw new Error("penyewa tidak ditemukan");
  }

  const oldRoomId = tenant.roomId;
  const newRoomId = data.roomId;

  // --- Jika tenant tidak aktif → lepas kamar lama saja ---
  if (!data.is_active) {
    if (oldRoomId) {
      await updateRoomStatus(oldRoomId, true); // kamar lama available
    }
  }
  // --- Jika tenant aktif → proses kamar baru ---
  else {
    // 1. Jika pilih kamar baru yang beda dari kamar lama
    if (newRoomId && newRoomId !== oldRoomId) {
      // kamar baru di-set tidak tersedia
      await updateRoomStatus(newRoomId, false);
    }

    // 2. Jika kamar lama berbeda dengan kamar baru → lepaskan kamar lama
    if (oldRoomId && oldRoomId !== newRoomId) {
      await updateRoomStatus(oldRoomId, true);
    }
  }

  const updatedTenant = await updateTenantById(id, data);

  return updatedTenant;
};
