import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export interface RequestWithUserId extends Request {
  userId?: String;
}
interface JwtPayloadWithUserId extends jwt.JwtPayload {
  userId: String;
}

export const verifyToken = async (
  req: RequestWithUserId,
  res: Response,
  next: Function
) => {
  const reqHeader = req.headers["authorization"];
  const token = reqHeader?.split("Bearer ")[1];

  if (!token) return res.status(401).json("No token provided");
  if (!process.env.JWT_SECRET_KEY) throw new Error("No JWT_SECRET_KEY found");

  try {
    let decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as JwtPayloadWithUserId;
    if (decoded) req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};
