import { payload, verifyToken } from "../utils";
import { Request, Response, NextFunction } from "express";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = req.headers.authorization;

    if (!headers) {
      return payload(res, 401, "authorization error");
    }

    const token = headers.split("Bearer ")[1];

    if (!token) {
      return payload(res, 401, "tidak ada token");
    }

    const decoded = verifyToken(token);
    (req as any).user = decoded;

    next();
  } catch (error: any) {
    console.error("Auth error:", error.message);

    if (error.message.includes("invalid signature")) {
      return payload(res, 401, "authorization error: invalid signature");
    }

    if (error.message.includes("invalid token")) {
      return payload(res, 401, "authorization error: invalid token");
    }

    if (error.message.includes("jwt expired")) {
      return payload(res, 401, "authorization error: jwt expired");
    }

    return payload(res, 500, "terjadi kesalahan pada server");
  }
};
