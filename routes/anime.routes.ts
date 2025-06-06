import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import prisma from '../db/index'; 

// Create a new anime
router.post('/animes', async (req: Request, res: Response, next: NextFunction) => {
  const { title, year, episodes, description, studio, rating, status, genre, image } = req.body;

  const newAnime = {
    title,
    description,
    year,
    episodes,
    studio,
    rating,
    genre,
    status,
    image
  };

  try {
    const anime = await prisma.anime.create({ data: newAnime });
    console.log('New anime created', anime);
    res.status(201).json(anime);
  } catch (err) {
    console.error('Error creating new anime', err);
    res.status(500).json({ message: 'Error creating new anime' });
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
router.put('/animes/:animeId', async (req: Request, res: Response) => {
  const animeId = parseInt(req.params.animeId, 10);
  const { title, year, episodes, description, studio, rating, status, genre, image } = req.body;

  const newAnimeDetails = {
    title,
    description,
    year,
    episodes,
    studio,
    rating,
    genre,
    status,
    image
  };

  try {
    const updatedAnime = await prisma.anime.update({ where: { id: animeId }, data: newAnimeDetails });
    res.json(updatedAnime);
  } catch (err) {
    console.error('Error updating a anime', err);
    res.status(500).json({ message: 'Error updating a anime' });
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