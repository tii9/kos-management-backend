import request from "supertest";
import app from "../../src/server";
import { getAllRoom } from "../../src/api/room/room.service";

jest.mock("../../src/api/room/room.service");

// mock middleware
jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("GET /api/room", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil mengambil semua data kamar (200)", async () => {
    (getAllRoom as jest.Mock).mockResolvedValue([
      { id: 1, name: "Kamar 1" },
      { id: 2, name: "Kamar 2" },
    ]);

    const res = await request(app).get("/api/room");

    expect(res.status).toBe(200);

    expect(res.body).toMatchObject({
      message: "berhasil mengambil semua data kamar",
      data: [
        { id: 1, name: "Kamar 1" },
        { id: 2, name: "Kamar 2" },
      ],
    });
  });

  test("tidak ada data kamar (200)", async () => {
    (getAllRoom as jest.Mock).mockRejectedValue(
      new Error("tidak ada data kamar")
    );

    const res = await request(app).get("/api/room");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("tidak ada data kamar");
  });

  test("server error (500)", async () => {
    (getAllRoom as jest.Mock).mockRejectedValue(new Error("unexpected error"));

    const res = await request(app).get("/api/room");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
