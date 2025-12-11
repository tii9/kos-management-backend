import request from "supertest";
import app from "../../src/server";
import { deleteRoomById } from "../../src/api/room/room.service";

jest.mock("../../src/api/room/room.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("DELETE /api/room/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil menghapus kamar (200)", async () => {
    (deleteRoomById as jest.Mock).mockResolvedValue({
      id: "1",
      room_number: "A01",
    });

    const res = await request(app).delete("/api/room/1");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "berhasil menghapus kamar A01",
      data: {
        id: "1",
        room_number: "A01",
      },
    });
  });

  test("kamar tidak ditemukan (200)", async () => {
    (deleteRoomById as jest.Mock).mockRejectedValue(
      new Error("data kamar tidak ditemukan")
    );

    const res = await request(app).delete("/api/room/999");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("data kamar tidak ditemukan");
  });

  test("server error (500)", async () => {
    (deleteRoomById as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );

    const res = await request(app).delete("/api/room/1");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
