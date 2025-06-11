import express from 'express';
import type { Request, Response, NextFunction } from 'express';
const router = express.Router();

import multer from "multer";
const upload = multer({ dest: "uploads/" });
import prisma from '../db/index'; 

// Create a new anime
router.post(
  '/animes',
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      const { title, year, episodes, description, studio, rating, status, genre } = req.body;
      const imageFilename = req.file?.filename;

      const newAnime = {
        title,
        description: description || null,
        year: year ? parseInt(year) : null,
        episodes: episodes ? parseInt(episodes) : null,
        studio: studio || null,
        rating: rating ? parseInt(rating) : null,
        genre: genre || null,
        status: status || null,
        image: imageFilename ? `/uploads/${imageFilename}` : null
      };

      const anime = await prisma.anime.create({ data: newAnime });
      res.status(201).json(anime);
    } catch (err) {
      console.error('Error creating new anime', err);
      res.status(500).json({ message: 'Error creating new anime' });
    }
  }
);

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