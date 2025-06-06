import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
const app: Application = express();

// CORS must come before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parser (from config)
import config from "./config";
config(app);

// Routes
import animeRoutes from './routes/anime.routes';
import indexRoutes from "./routes/index.routes";
import authRouter from "./routes/auth.routes";

// ✅ Mount /api routes in the right order
app.use("/api", animeRoutes);
app.use("/api", indexRoutes);
app.use("/auth", authRouter);

// Error handler comes last
import errorHandler from "./error-handling";
errorHandler(app);

export default app;