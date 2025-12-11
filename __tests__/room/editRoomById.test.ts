import request from "supertest";
import app from "../../src/server";
import { editRoomById } from "../../src/api/room/room.service";

jest.mock("../../src/api/room/room.service");

jest.mock("../../src/middleware/auth.middleware", () => ({
  AuthMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("PUT /api/room/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil mengubah data kamar (200)", async () => {
    (editRoomById as jest.Mock).mockResolvedValue({
      id: "1",
      room_number: "A01",
      price: 600000,
    });

    const payload = {
      room_number: "A01",
      price: 600000,
    };

    const res = await request(app).put("/api/room/1").send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "berhasil mengubah data kamar A01",
      data: {
        id: "1",
        room_number: "A01",
        price: 600000,
      },
    });
  });

  test("kamar tidak ditemukan (200)", async () => {
    (editRoomById as jest.Mock).mockRejectedValue(
      new Error("kamar tidak ditemukan")
    );

    const res = await request(app).put("/api/room/999").send({
      room_number: "A999",
      price: 100000,
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("kamar tidak ditemukan");
  });

  test("validasi gagal: field wajib diisi (400)", async () => {
    (editRoomById as jest.Mock).mockRejectedValue(
      new Error("room_number wajib diisi")
    );

    const res = await request(app).put("/api/room/1").send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("room_number wajib diisi");
  });

  test("server error (500)", async () => {
    (editRoomById as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );

    const payload = {
      room_number: "A01",
      price: 600000,
    };

    const res = await request(app).put("/api/room/1").send(payload);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("server error");
  });
});
