import request from "supertest";
import app from "../../src/server";
import { deleteTenantById } from "../../src/api/tenant/tenant.service";

jest.mock("../../src/api/tenant/tenant.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("DELETE /api/tenant/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil menghapus penyewa (200)", async () => {
    (deleteTenantById as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Naruto",
    });

    const res = await request(app).delete("/api/tenant/1");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "berhasil menghapus data penyewa: Naruto",
      data: {
        id: "1",
        name: "Naruto",
      },
    });
  });

  test("penyewa tidak ditemukan (200)", async () => {
    (deleteTenantById as jest.Mock).mockRejectedValue(
      new Error("data penyewa tidak ditemukan")
    );

    const res = await request(app).delete("/api/tenant/999");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("data penyewa tidak ditemukan");
  });

  test("server error (500)", async () => {
    (deleteTenantById as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );

    const res = await request(app).delete("/api/tenant/1");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
