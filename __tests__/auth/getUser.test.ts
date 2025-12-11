import { getUserByUsernameController } from "../../src/api/auth/auth.controller";
import { getUserByUsername } from "../../src/api/auth/auth.service";
import { generateToken } from "../../src/utils/jwt";
import { payload } from "../../src/utils/payload";

// mock module
jest.mock("../../src/api/auth/auth.service");
jest.mock("../../src/utils/jwt");
jest.mock("../../src/utils/payload");

describe("POST /api/auth/login", () => {
  const mockRequest = (body: any) => ({ body } as any);

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil mengambil user (200)", async () => {
    const req = mockRequest({ username: "test", password: "test123" });
    const res = mockResponse();

    (getUserByUsername as jest.Mock).mockResolvedValue({
      id: 1,
      username: "test",
    });

    (generateToken as jest.Mock).mockReturnValue("mockToken");

    await getUserByUsernameController(req, res);

    expect(getUserByUsername).toHaveBeenCalledWith({
      username: "test",
      password: "test123",
    });

    expect(generateToken).toHaveBeenCalledWith({
      id: 1,
      username: "test",
    });

    expect(payload).toHaveBeenCalledWith(
      res,
      200,
      "berhasil mengambil data user",
      { id: 1, username: "test" },
      "mockToken"
    );
  });

  test("user tidak ditemukan (404)", async () => {
    const req = mockRequest({ username: "test", password: "test123" });
    const res = mockResponse();

    (getUserByUsername as jest.Mock).mockRejectedValue(
      new Error("user tidak ditemukan")
    );

    await getUserByUsernameController(req, res);

    expect(payload).toHaveBeenCalledWith(res, 404, "user tidak ditemukan");
  });

  test("password salah (401)", async () => {
    const req = mockRequest({ username: "test", password: "test123" });
    const res = mockResponse();

    (getUserByUsername as jest.Mock).mockRejectedValue(
      new Error("password salah")
    );

    await getUserByUsernameController(req, res);

    expect(payload).toHaveBeenCalledWith(res, 401, "password salah");
  });

  test("error lain dari service (400)", async () => {
    const req = mockRequest({ username: "test" });
    const res = mockResponse();

    (getUserByUsername as jest.Mock).mockRejectedValue(
      new Error("format data salah")
    );

    await getUserByUsernameController(req, res);

    expect(payload).toHaveBeenCalledWith(res, 400, "format data salah");
  });

  test("server error tak terduga (500)", async () => {
    const req = mockRequest({ username: "test" });
    const res = mockResponse();

    (getUserByUsername as jest.Mock).mockRejectedValue("random unknown error");

    await getUserByUsernameController(req, res);

    expect(payload).toHaveBeenCalledWith(res, 500, "terjadi kesalahan server");
  });
});
