import { Response, Request } from "express";
import { TenantType } from "../../types";
import {
  createNewTenant,
  deleteTenantById,
  editTenantById,
  getAllTenants,
  getTenantById,
} from "./tenant.service";
import { payload } from "../../utils";

export const getAllTenantsController = async (req: Request, res: Response) => {
  try {
    const tenant = await getAllTenants();

    console.log("mengambil semua data penyewa");
    return payload(res, 200, "berhasil mengambil semua data penyewa", tenant);
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("tidak ada")) {
        return payload(res, 200, error.message);
      }
    }
    console.log(error.message);
    return payload(res, 500, "server error");
  }
};

export const getTenantByIdController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const tenant = await getTenantById(id);

    console.log(`mengambil data penyewa: ${tenant.name}`);
    return payload(
      res,
      200,
      `berhasil mengambil data penyewa: ${tenant.name}`,
      tenant
    );
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("tidak ditemukan")) {
        return payload(res, 200, error.message);
      }
    }

    console.log(error.message);
    return payload(res, 500, "server error");
  }
};

export const createNewTenantController = async (
  req: Request<{}, {}, TenantType>,
  res: Response
) => {
  try {
    const data = req.body;
    const tenant = await createNewTenant(data);

    console.log("berhasil membuat data penyewa baru");
    return payload(res, 201, "berhasil membuat data penyewa baru", tenant);
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("wajib diisi")) {
        return payload(res, 400, error.message);
      }
    }

    console.log(error.message);
    return payload(res, 500, "server error");
  }
};

export const deleteTenantByIdController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const room = await deleteTenantById(id);

    console.log(`berhasil menghapus data penyewa: ${room.name}`);
    payload(res, 200, `berhasil menghapus data penyewa: ${room.name}`, room);
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("tidak ditemukan")) {
        payload(res, 200, error.message);
      }
    }
    console.log(error.message);
    payload(res, 500, "server error");
  }
};

export const editTenantByIdController = async (
  req: Request<{ id: string }, {}, TenantType>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const tenant = await editTenantById(id, data);
    console.log(`berhasil mengubah data penyewa: ${tenant.name}`);
    payload(res, 200, "berhasil mengubah data", tenant);
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.message.includes("tidak ditemukan")) {
        payload(res, 200, error.message);
      }

      if (error.message.includes("wajib diisi")) {
        payload(res, 400, error.message);
      }
    }
    console.log(error.message);
    payload(res, 500, "server error");
  }
};
