import express, { Request, Response, NextFunction } from "express";

// Extend the Request type to include the payload property
declare global {
  namespace Express {
    interface Request {
      payload?: JwtPayload & { id: string; email: string; name: string };
    }
  }
}
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../db";
import { isAuthenticated } from "../jwt.middleware";

const router = express.Router();

// GET /users - list all users (basic public info)
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true },
    });
    console.log("Retrieved users ->", users);
    res.json(users);
  } catch (error) {
    console.error("Error while retrieving users ->", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// GET /users/my-profile - get logged-in user's profile
router.get("/my-profile", isAuthenticated, );

// PUT /users/edit-profile - update name/email/password
router.put("/edit-profile", isAuthenticated, async (req: Request, res: Response) => {
  const userId = req.payload?.id;
  const { userName, email, password } = req.body;

  try {
    const updateData: { name?: string; email?: string; password?: string } = {};

    if (userName) updateData.userName = userUname;
    if (email) updateData.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: (error as Error).message });
  }
});

export default router;