// routes/auth.ts

import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/index"; 
import { isAuthenticated } from "../jwt.middleware"; 

const router = express.Router();
const saltRounds = 10;

interface SignupRequestBody {
  email: string;
  password: string;
  name: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface JwtPayload {
  id: string;
  email: string;
  name: string;
}
interface RequestWithPayload extends Request {
  payload?: JwtPayload;
}

// POST /auth/signup
router.post(
  "/signup",
  async (
    req: Request<{}, {}, SignupRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    try {
      const foundUser = await prisma.user.findUnique({ where: { email } });

      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      const createdUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      const { id } = createdUser;
      res.status(201).json({ user: { id, name, email } });
    } catch (err) {
      next(err);
    }
  }
);

// POST /auth/login
router.post(
  "/login",
  async (
    req: Request<{}, {}, LoginRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, user.password);

      if (!passwordCorrect) {
        res.status(401).json({ message: "Incorrect password." });
        return;
      }

      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET as string,
        {
          algorithm: "HS256",
          expiresIn: "6h",
        }
      );

      res.status(200).json({ authToken });
    } catch (err) {
      next(err);
    }
  }
);

// GET /auth/verify
router.get(
  "/verify",
  isAuthenticated,
  (req: RequestWithPayload, res: Response) => {
    res.status(200).json(req.payload);
  }
);

export default router;