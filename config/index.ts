import { Application } from "express";
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

const config = (app: Application): void => {
  // Trust proxy settings for services like Heroku
  app.set("trust proxy", 1);

  // Enable CORS for frontend
  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  );

  // Logger middleware for dev environment
  app.use(logger("dev"));

  // Parse incoming request bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Parse cookies
  app.use(cookieParser());
};

export default config;