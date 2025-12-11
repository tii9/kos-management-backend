import request from "supertest";
import app from "../../src/server";
import { createNewRoom } from "../../src/api/room/room.service";

jest.mock("../../src/api/room/room.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("POST /api/room", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil membuat data kamar baru (201)", async () => {
    (createNewRoom as jest.Mock).mockResolvedValue({
      id: 1,
      room_number: "A01",
      price: 550000,
      available: true,
    });

    const payload = {
      room_number: "A02",
      price: 600000,
      available: true,
    };

    const res = await request(app).post("/api/room").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: "berhasil membuat data kamar baru",
      data: {
        id: 1,
        room_number: "A01",
        price: 550000,
        available: true,
      },
    });
  });

  test("validasi gagal: nomor kamar dan harga wajib diisi (400)", async () => {
    (createNewRoom as jest.Mock).mockRejectedValue(
      new Error("nomor kamar dan harga wajib diisi")
    );

    const res = await request(app).post("/api/room").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("nomor kamar dan harga wajib diisi");
  });

  test("kamar sudah ada (409)", async () => {
    (createNewRoom as jest.Mock).mockRejectedValue(
      new Error("nomor kamar sudah ada")
    );

    const payload = {
      room_number: "A01",
      price: 550000,
    };

    const res = await request(app).post("/api/room").send(payload);

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("nomor kamar sudah ada");
  });

  test("server error (500)", async () => {
    (createNewRoom as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );

    const payload = {
      room_number: "A01",
      price: 550000,
    };

    const res = await request(app).post("/api/room").send(payload);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
