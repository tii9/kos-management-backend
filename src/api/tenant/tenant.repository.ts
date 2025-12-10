import prisma from "../../db/prisma";
import { TenantType } from "../../types";

export const fetchAllTenants = async () => {
  const tenant = await prisma.tenant.findMany({
    include: { room: true },
  });

  return tenant;
};

export const fetchTenantById = async (id: string) => {
  const tenant = await prisma.tenant.findUnique({
    where: { id },
    include: { room: true },
  });

  return tenant;
};

export const insertTenant = async (data: TenantType) => {
  const tenant = await prisma.tenant.create({
    data: {
      name: data.name,
      phone: data.phone,
    },
  });

  return tenant;
};

export const updateTenantById = async (id: string, data: TenantType) => {
  const tenant = await prisma.tenant.update({
    where: { id },
    data: {
      name: data.name,
      phone: data.phone,
      start_date: data.start_date,
      next_payment_date: data.next_payment_date,
      is_active: data.is_active,
      payment_status: data.payment_status,
      roomId: data.roomId ?? null,
    },
  });

  return tenant;
};

export const dropTenantById = async (id: string) => {
  const tenant = await prisma.tenant.delete({
    where: { id },
  });

  return tenant;
};
