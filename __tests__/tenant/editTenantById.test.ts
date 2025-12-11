import request from "supertest";
import app from "../../src/server";
import { editTenantById } from "../../src/api/tenant/tenant.service";

jest.mock("../../src/api/tenant/tenant.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("PUT /api/tenant/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil mengubah data penyewa (200)", async () => {
    (editTenantById as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Naruto",
      phone: "08123456789",
    });

    const res = await request(app).put("/api/tenant/1").send({
      name: "Naruto",
      phone: "08123456789",
    });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "berhasil mengubah data",
      data: {
        id: "1",
        name: "Naruto",
        phone: "08123456789",
      },
    });
  });

  test("penyewa tidak ditemukan (200)", async () => {
    (editTenantById as jest.Mock).mockRejectedValue(
      new Error("data penyewa tidak ditemukan")
    );

    const res = await request(app).put("/api/tenant/999").send({
      name: "Tidak Ada",
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("data penyewa tidak ditemukan");
  });

  test("field wajib diisi (400)", async () => {
    (editTenantById as jest.Mock).mockRejectedValue(
      new Error("nama penyewa wajib diisi")
    );

    const res = await request(app).put("/api/tenant/1").send({
      name: "",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("nama penyewa wajib diisi");
  });

  test("server error (500)", async () => {
    (editTenantById as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );

    const res = await request(app).put("/api/tenant/1").send({
      name: "Naruto",
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
