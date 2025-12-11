import request from "supertest";
import app from "../../src/server";
import { getTenantById } from "../../src/api/tenant/tenant.service";

jest.mock("../../src/api/tenant/tenant.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("GET /api/tenant/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil mengambil data penyewa (200)", async () => {
    (getTenantById as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Naruto",
      phone: "08123456789",
    });

    const res = await request(app).get("/api/tenant/1");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "berhasil mengambil data penyewa: Naruto",
      data: {
        id: "1",
        name: "Naruto",
        phone: "08123456789",
      },
    });
  });

  test("penyewa tidak ditemukan (200)", async () => {
    (getTenantById as jest.Mock).mockRejectedValue(
      new Error("data penyewa tidak ditemukan")
    );

    const res = await request(app).get("/api/tenant/999");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("data penyewa tidak ditemukan");
  });

  test("server error (500)", async () => {
    (getTenantById as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );

    const res = await request(app).get("/api/tenant/1");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
