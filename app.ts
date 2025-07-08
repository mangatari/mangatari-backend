import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import path from "path"; // Import path module
import favoritesRoutes from './routes/favorites.routes';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

// 2. Verify environment variables immediately
console.log('Environment check:', {
  supabaseUrl: process.env.SUPABASE_URL ? 'exists' : 'missing',
  nodeEnv: process.env.NODE_ENV
});

const app: Application = express();


const allowedOrigins = [
  'https://mangatari-new.netlify.app', // Your Netlify frontend
  'http://localhost:5173'              // Local dev server
];

import { Request, Response, NextFunction } from "express";

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
     res.sendStatus(200);
     return;
  }
  
  next();
});



app.get('/health', (req, res) => {
  res.json({
    status: 'running',
    supabaseConfigured: !!process.env.SUPABASE_URL
  });
});

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