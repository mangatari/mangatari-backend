import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

export function isAuthenticated(
  req: Request & { payload?: JwtPayload },
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
    req.payload = payload;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
}