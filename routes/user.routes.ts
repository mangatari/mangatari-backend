import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../db";
import { isAuthenticated } from "../jwt.middleware";

const router = express.Router();

// Extend the Request type to include the payload property
declare global {
  namespace Express {
    interface Request {
      payload?: JwtPayload & { id: string; email: string; username: string; name: string };
    }
  }
}

// GET /users - list all users (basic public info)
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany({
      select: { id: true, username: true },
    });
    console.log("Retrieved users ->", users);
    res.json(users);
  } catch (error) {
    console.error("Error while retrieving users ->", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// GET /users/my-profile - get logged-in user's profile
router.get("/my-profile", isAuthenticated, async (req: Request, res: Response): Promise<void> => {
  const userId = req.payload?.id;

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId ? parseInt(userId, 10) : undefined },
      select: { id: true, username: true, email: true },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ message: "Error retrieving profile", error: (error as Error).message });
  }
});

// PUT /users/edit-profile - update username/email/password
router.put("/edit-profile", isAuthenticated, async (req: Request, res: Response) => {
  const userId = req.payload?.id;
  const { username, email, password } = req.body;

  try {
    const updateData: { username?: string; email?: string; password?: string } = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.users.update({
      where: { id: userId ? parseInt(userId, 10) : undefined },
      data: updateData,
      select: { id: true, username: true, email: true },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: (error as Error).message });
  }
});

export default router;