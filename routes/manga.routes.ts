import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import prisma from '../db/index'; 

// Create a new manga
router.post('/mangas', async (req: Request, res: Response, next: NextFunction) => {
  const { title, year, episodes, description, studio, rating, status, genre, image } = req.body;

  const newManga = {
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
    const manga = await prisma.manga.create({ data: newManga });
    console.log('New manga created', manga);
    res.status(201).json(manga);
  } catch (err) {
    console.error('Error creating new manga', err);
    res.status(500).json({ message: 'Error creating new manga' });
  }
});

// Retrieve all mangas
router.get('/mangas', async (_req: Request, res: Response) => {
  try {
    const allMangas = await prisma.manga.findMany();
    res.json(allMangas);
  } catch (err) {
    console.error('Error getting mangas from DB', err);
    res.status(500).json({ message: 'Error getting mangas from DB' });
  }
});

// Retrieve a specific manga by ID
router.get('/mangas/:mangaId', async (req: Request, res: Response) => {
  const mangaId = parseInt(req.params.mangaId, 10);

  try {
    const manga = await prisma.manga.findUnique({ where: { id: mangaId } });
    if (!manga) {
      res.status(404).json({ message: 'Manga not found' });
    } else {
      res.json(manga);
    }
  } catch (err) {
    console.error('Error getting manga from DB', err);
    res.status(500).json({ message: 'Error getting manga from DB' });
  }
});

// Update a manga by ID
router.put('/mangas/:mangaId', async (req: Request, res: Response) => {
  const mangaId = parseInt(req.params.mangaId, 10);
  const { title, description, year, volumes, chapters, author, rating, genre, status, image } = req.body;

const newMangaDetails = {
  title,
  description,
  year,
  volumes,
  chapters,
  author,
  rating,
  genre,
  status,
  image
};

  try {
    const updatedManga = await prisma.manga.update({ where: { id: mangaId }, data: newMangaDetails });
    res.json(updatedManga);
  } catch (err) {
    console.error('Error updating a manga', err);
    res.status(500).json({ message: 'Error updating a manga' });
  }
});

// Delete a manga by ID
router.delete('/mangas/:mangaId', async (req: Request, res: Response) => {
  const mangaId = parseInt(req.params.mangaId, 10);

  try {
    await prisma.manga.delete({ where: { id: mangaId } });
    res.json({ message: `Manga with id ${mangaId} was deleted successfully` });
  } catch (err) {
    console.error('Error deleting a manga', err);
    res.status(500).json({ message: 'Error deleting a manga' });
  }
});

export default router;