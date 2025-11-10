import jwt from "jsonwebtoken";
import "dotenv/config";

const JWTSecret = process.env.JWT_SECRET || "rahasia";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWTSecret, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWTSecret);
};
