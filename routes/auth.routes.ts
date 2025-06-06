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

// POST /auth/signup
router.post(
  "/signup",
  async (
    req: Request<{}, {}, SignupRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Provide email, password and name" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Provide a valid email address." });
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
    }

    try {
      const foundUser = await prisma.user.findUnique({ where: { email } });

      if (foundUser) {
        return res.status(400).json({ message: "User already exists." });
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
  ) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Provide email and password." });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }

      const passwordCorrect = bcrypt.compareSync(password, user.password);

      if (!passwordCorrect) {
        return res.status(401).json({ message: "Incorrect password." });
      }

      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      res.status(200).json({ authToken });
    } catch (err) {
      next(err);
    }
  }
);

// GET /auth/verify
router.get("/verify", isAuthenticated, (req: Request, res: Response) => {
  res.status(200).json(req.payload);
});

export default router;