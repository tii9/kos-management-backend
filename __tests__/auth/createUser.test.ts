import request from "supertest";
import app from "../../src/server";
import prisma from "../../src/db/prisma";

// mock prisma
jest.mock("../../src/db/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe("POST /api/auth", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil membuat user, return 201", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 1,
      username: "test",
    });
    const res = await request(app)
      .post("/api/auth")
      .send({ username: "test", password: "test123" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: "berhasil menambahkan user",
      data: { username: "test" },
    });
  });

  test("gagal karena username sudah digunakan, return 409", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      username: "test",
    });
    const res = await request(app)
      .post("/api/auth")
      .send({ username: "test", password: "test123" });
    expect(res.status).toBe(409);
    expect(res.body.message).toBe("username sudah digunakan");
  });

  test("gagal karena field kosong (400)", async () => {
    const res = await request(app)
      .post("/api/auth")
      .send({ username: "", password: "" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("username atau password tidak boleh kosong");
  });

  test("gagal server error, return 500", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(
      new Error("unexpected error")
    );
    const res = await request(app)
      .post("/api/auth")
      .send({ username: "test", password: "test123" });
    expect(res.status).toBe(500);
    expect(res.body.message).toBe("terjadi kesalahan pada server");
  });
});
