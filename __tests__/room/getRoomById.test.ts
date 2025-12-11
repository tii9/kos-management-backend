import request from "supertest";
import app from "../../src/server";
import { getRoomById } from "../../src/api/room/room.service";

jest.mock("../../src/api/room/room.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("GET /api/room/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil mengambil data kamar (200)", async () => {
    (getRoomById as jest.Mock).mockResolvedValue({
      id: "1",
      room_number: "A101",
      price: 500000,
    });

    const res = await request(app).get("/api/room/1");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "berhasil mengambil data kamar A101",
      data: {
        id: "1",
        room_number: "A101",
        price: 500000,
      },
    });
  });

  test("kamar tidak ditemukan (200)", async () => {
    (getRoomById as jest.Mock).mockRejectedValue(
      new Error("kamar tidak ditemukan")
    );

    const res = await request(app).get("/api/room/999");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("kamar tidak ditemukan");
  });

  test("server error (500)", async () => {
    (getRoomById as jest.Mock).mockRejectedValue(new Error("unexpected error"));

    const res = await request(app).get("/api/room/1");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
