import { TenantType } from "../../types";
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

  await getTenantById(id);

  const room = await updateTenantById(id, data);

  return room;
};
