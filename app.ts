// app.ts

import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
const app: Application = express();

// Load middleware configuration
import config from "./config";
config(app);

// Routes
import indexRoutes from "./routes/index.routes";
app.use("/api", indexRoutes);

// Error handling
import errorHandler from "./error-handling";
errorHandler(app);

export default app;