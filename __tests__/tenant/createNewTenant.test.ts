import request from "supertest";
import app from "../../src/server";
import { createNewTenant } from "../../src/api/tenant/tenant.service";

jest.mock("../../src/api/tenant/tenant.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("POST /api/tenant", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil membuat data penyewa baru (201)", async () => {
    (createNewTenant as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Naruto",
      phone: "08123456789",
    });

    const payload = {
      name: "Naruto",
      phone: "08123456789",
    };

    const res = await request(app).post("/api/tenant").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: "berhasil membuat data penyewa baru",
      data: {
        id: 1,
        name: "Naruto",
        phone: "08123456789",
      },
    });
  });

  test("validasi gagal: field wajib diisi (400)", async () => {
    (createNewTenant as jest.Mock).mockRejectedValue(
      new Error("nama dan no hp penyewa wajib diisi")
    );

    const res = await request(app).post("/api/tenant").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("nama dan no hp penyewa wajib diisi");
  });

  test("server error (500)", async () => {
    (createNewTenant as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );

    const payload = {
      name: "Naruto",
      phone: "08123456789",
    };

    const res = await request(app).post("/api/tenant").send(payload);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
