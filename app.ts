import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import path from "path"; // Import path module
import favoritesRoutes from './routes/favorites.routes';
const app: Application = express();

// CORS must come before routes


app.use('/uploads', express.static('uploads'));

// Body parser (from config)
import config from "./config";
config(app);

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})
    

// Routes
import animeRoutes from './routes/anime.routes';
import indexRoutes from "./routes/index.routes";
import authRouter from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";     
import mangaRoutes from "./routes/manga.routes";   

app.use(express.json());

app.use('/api', animeRoutes);
app.use("/api", indexRoutes);
app.use("/auth", authRouter);
app.use("/api", userRoutes);     
app.use("/api", mangaRoutes);
app.use('/api/favorites', favoritesRoutes);

// Error handling
import errorHandler from "./error-handling";
errorHandler(app);

export default app;