import { Router, Request, Response } from 'express';
import prisma from '../db/index';

const router = Router();

// Add favorite anime
router.post('/anime', async (req: Request, res: Response): Promise<void> => {
  const { userId, animeId } = req.body;

  try {
    const existing = await prisma.userAnime.findFirst({
      where: { userId, animeId }
    });

    if (existing) {
      res.status(400).json({ message: 'Anime already in favorites' });
      return;
    }

    const favorite = await prisma.userAnime.create({
      data: { userId, animeId }
    });

    res.status(201).json(favorite);
  } catch (err) {
    console.error('Error adding anime to favorites:', err);
    res.status(500).json({ message: 'Error adding anime to favorites' });
  }
});

// Get user's favorite anime
router.get('/anime/:userId', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const favorites = await prisma.userAnime.findMany({
      where: { userId },
      include: { anime: true }
    });

    const animeList = favorites.map(fav => fav.anime);
    res.json(animeList);
  } catch (err) {
    console.error('Error fetching favorite anime:', err);
    res.status(500).json({ message: 'Error fetching favorite anime' });
  }
});

// Add favorite manga
router.post('/manga', async (req: Request, res: Response): Promise<void> => {
  const { userId, mangaId } = req.body;

  try {
    const existing = await prisma.userManga.findFirst({
      where: { userId, mangaId }
    });

    if (existing) {
      res.status(400).json({ message: 'Manga already in favorites' });
      return;
    }

    const favorite = await prisma.userManga.create({
      data: { userId, mangaId }
    });

    res.status(201).json(favorite);
  } catch (err) {
    console.error('Error adding manga to favorites:', err);
    res.status(500).json({ message: 'Error adding manga to favorites' });
  }
});

// Get user's favorite manga
router.get('/manga/:userId', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const favorites = await prisma.userManga.findMany({
      where: { userId },
      include: { manga: true }
    });

    const mangaList = favorites.map(fav => fav.manga);
    res.json(mangaList);
  } catch (err) {
    console.error('Error fetching favorite manga:', err);
    res.status(500).json({ message: 'Error fetching favorite manga' });
  }
});

// Remove favorite anime
router.delete("/anime/:userId/:animeId", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const animeId = parseInt(req.params.animeId);

  try {
    const deleted = await prisma.userAnime.deleteMany({
      where: { userId, animeId },
    });

    if (deleted.count === 0) {
      res.status(404).json({ message: "Favorite anime not found" });
      return;
    }

    res.json({ message: "Anime removed from favorites" });
    return;
  } catch (err) {
    console.error("Error removing anime from favorites:", err);
    res.status(500).json({ message: "Error removing anime from favorites" });
    return;
  }
});

// Remove favorite manga
router.delete("/manga/:userId/:mangaId", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const mangaId = parseInt(req.params.mangaId);

  try {
    const deleted = await prisma.userManga.deleteMany({
      where: { userId, mangaId },
    });

    if (deleted.count === 0) {
      res.status(404).json({ message: "Favorite manga not found" });
      return;
    }

    res.json({ message: "Manga removed from favorites" });
  } catch (err) {
    console.error("Error removing manga from favorites:", err);
    res.status(500).json({ message: "Error removing manga from favorites" });
  }
});

export default router;