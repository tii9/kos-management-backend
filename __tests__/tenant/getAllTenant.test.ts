import request from "supertest";
import app from "../../src/server";
import { getAllTenants } from "../../src/api/tenant/tenant.service";

jest.mock("../../src/api/tenant/tenant.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("GET /api/tenant", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil mengambil semua data penyewa (200)", async () => {
    (getAllTenants as jest.Mock).mockResolvedValue([
      { id: 1, name: "Naruto", phone: "08123456789" },
      { id: 2, name: "Sasuke", phone: "08987654321" },
    ]);

    const res = await request(app).get("/api/tenant");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "berhasil mengambil semua data penyewa",
      data: [
        { id: 1, name: "Naruto", phone: "08123456789" },
        { id: 2, name: "Sasuke", phone: "08987654321" },
      ],
    });
  });

  test("tidak ada data penyewa (200)", async () => {
    (getAllTenants as jest.Mock).mockRejectedValue(
      new Error("tidak ada data penyewa")
    );

    const res = await request(app).get("/api/tenant");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("tidak ada data penyewa");
  });

  test("server error (500)", async () => {
    (getAllTenants as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );

    const res = await request(app).get("/api/tenant");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
