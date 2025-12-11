import request from "supertest";
import app from "../../src/server";
import { getAvailableRoom } from "../../src/api/room/room.service";

jest.mock("../../src/api/room/room.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("GET /api/room/available", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil mengambil data kamar yang tersedia (200)", async () => {
    (getAvailableRoom as jest.Mock).mockResolvedValue([
      { id: 1, name: "Kamar 1", available: true },
      { id: 3, name: "Kamar 3", available: true },
    ]);

    const res = await request(app).get("/api/room/available_room");

    expect(res.status).toBe(200);

    expect(res.body).toMatchObject({
      message: "berhasil mengambil data kamar yang tersedia",
      data: [
        { id: 1, name: "Kamar 1", available: true },
        { id: 3, name: "Kamar 3", available: true },
      ],
    });
  });

  test("tidak ada kamar tersedia (200)", async () => {
    (getAvailableRoom as jest.Mock).mockRejectedValue(
      new Error("tidak ada kamar tersedia")
    );

    const res = await request(app).get("/api/room/available_room");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("tidak ada kamar tersedia");
  });

  test("server error (500)", async () => {
    (getAvailableRoom as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );

    const res = await request(app).get("/api/room/available_room");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
