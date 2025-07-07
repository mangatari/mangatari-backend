import express from 'express';
import type { Request, Response } from 'express';
import prisma from '../db/index';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Create Anime - Only accepts Supabase URLs
router.post('/animes', async (req: Request, res: Response) => {
  try {
    const { title, year, episodes, description, studio, rating, status, genre, imageUrl } = req.body;

    // Validate the image URL comes from our Supabase
    if (imageUrl && !imageUrl.includes(process.env.SUPABASE_URL!)) {
      res.status(400).json({ message: 'Invalid image source' });
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

// Update Anime - Modified to also use Supabase URLs
router.put("/animes/:animeId", async (req: Request, res: Response) => {
  const animeId = parseInt(req.params.animeId, 10);

  try {
    const { title, year, episodes, description, studio, rating, status, genre, imageUrl } = req.body;

    // Validate image URL if provided
    if (imageUrl && !imageUrl.includes(process.env.SUPABASE_URL!)) {
      res.status(400).json({ message: 'Invalid image source' });
      return;
    }

    const updatedAnime = {
      title,
      description,
      year: parseInt(year),
      episodes: parseInt(episodes),
      studio,
      rating: parseInt(rating),
      genre,
      status,
      image: imageUrl
    };

    const anime = await prisma.anime.update({
      where: { id: animeId },
      data: updatedAnime,
    });
    res.json(anime);
  } catch (err) {
    console.error("Error updating anime", err);
    res.status(500).json({ message: "Error updating anime" });
  }
});

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