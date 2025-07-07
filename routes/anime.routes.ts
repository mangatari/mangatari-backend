import express from 'express';
import type { Request, Response, NextFunction } from 'express';
const router = express.Router();

import multer from "multer";
const upload = multer({ dest: "uploads/" });
import prisma from '../db/index'; 

import { createClient } from '@supabase/supabase-js';


if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error(
    `Supabase credentials missing! 
     SUPABASE_URL: ${process.env.SUPABASE_URL ? 'set' : 'missing'}
     SUPABASE_KEY: ${process.env.SUPABASE_KEY ? 'set' : 'missing'}`
  );
}

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Create a new anime
router.post('/animes', async (req: Request, res: Response) => {
  try {
    const { title, year, episodes, description, studio, rating, status, genre, imageUrl } = req.body;

    // Added return statement here to fix the missing return
    if (imageUrl && !imageUrl.includes(process.env.SUPABASE_URL!)) {
       res.status(400).json({ message: 'Invalid image URL' });
       return;
    }

    const newAnime = {
      title,
      description: description || null,
      year: year ? parseInt(year) : null,
      episodes: episodes ? parseInt(episodes) : null,
      studio: studio || null,
      rating: rating ? parseInt(rating) : null,
      genre: genre || null,
      status: status || null,
      image: imageUrl || null
    };

    const anime = await prisma.anime.create({ data: newAnime });
    res.status(201).json(anime);
  } catch (err) {
    console.error('Error creating anime', err);
    res.status(500).json({ message: 'Error creating anime' });
  }
});

// Added new endpoint for image uploads
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
       res.status(400).json({ message: 'No file uploaded' });
       return;
    }

    const file = req.file;
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('anime-pics')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('anime-pics')
      .getPublicUrl(data.path);

    res.json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

// Retrieve all animes
router.get('/animes', async (_req: Request, res: Response) => {
  try {
    const allAnimes = await prisma.anime.findMany();
    res.json(allAnimes);
  } catch (err) {
    console.error('Error getting animes from DB', err);
    res.status(500).json({ message: 'Error getting animes from DB' });
  }
});

// Retrieve a specific anime by ID
router.get('/animes/:animeId', async (req: Request, res: Response) => {
  const animeId = req.params.animeId;

  try {
    const anime = await prisma.anime.findUnique({ where: { id: parseInt(animeId, 10) } });
    if (!anime) {
      res.status(404).json({ message: 'anime not found' });
    } else {
      res.json(anime);
    }
  } catch (err) {
    console.error('Error getting anime from DB', err);
    res.status(500).json({ message: 'Error getting anime from DB' });
  }
});

// Update a anime by ID
router.put(
  "/animes/:animeId",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const animeId = parseInt(req.params.animeId, 10);

    // Get existing anime first to preserve existing image if no new one uploaded
    const existingAnime = await prisma.anime.findUnique({
      where: { id: animeId }
    });

    const { title, year, episodes, description, studio, rating, status, genre } = req.body;

    const updatedAnime = {
      title,
      description,
      year: parseInt(year),
      episodes: parseInt(episodes),
      studio,
      rating: parseInt(rating),
      genre,
      status,
      // Only update image if a new file was uploaded
      image: req.file ? `/uploads/${req.file.filename}` : existingAnime?.image

    };

    try {
      const anime = await prisma.anime.update({
        where: { id: animeId },
        data: updatedAnime,
      });
      res.json(anime);
    } catch (err) {
      console.error("Error updating anime", err);
      res.status(500).json({ message: "Error updating anime" });
    }
  }
);

// Delete a anime by ID
router.delete('/animes/:animeId', async (req: Request, res: Response) => {
  const animeId = req.params.animeId;

  try {
    await prisma.anime.delete({ where: { id: parseInt(animeId, 10) } });
    res.json({ message: `anime with id ${animeId} was deleted successfully` });
  } catch (err) {
    console.error('Error deleting a anime', err);
    res.status(500).json({ message: 'Error deleting a anime' });
  }
});

export default router;