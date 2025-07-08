import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import prisma from '../db/index';

// Create a new manga
router.post(
  '/mangas',
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Received POST body:", req.body);

    const { title, year, volumes, chapters, description, author, rating, status, genre, imageUrl } = req.body;

    const newManga = {
      title,
      description,
      year: year ? Number(year) : null,
      volumes: volumes ? Number(volumes) : null,
      chapters: chapters ? Number(chapters) : null,
      author,
      rating: rating ? Number(rating) : null,
      genre,
      status,
      image: imageUrl || null,
    };

    try {
      const manga = await prisma.manga.create({ data: newManga });
      console.log('New manga created', manga);
      res.status(201).json(manga);
    } catch (err) {
      console.error('Error creating new manga', err);
      res.status(500).json({ message: 'Error creating new manga' });
    }
  }
);

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
router.put(
  "/mangas/:mangaId",
  async (req: Request, res: Response): Promise<void> => {
    const mangaId = parseInt(req.params.mangaId, 10);

    // Get existing manga first to preserve existing image if no new one provided
    const existingManga = await prisma.manga.findUnique({
      where: { id: mangaId }
    });

    if (!existingManga) {
      res.status(404).json({ message: 'Manga not found' });
      return;
    }

    const { title, year, volumes, chapters, description, author, rating, status, genre, imageUrl } = req.body;

    const updatedManga = {
      title,
      description,
      year: year ? parseInt(year) : existingManga.year,
      volumes: volumes ? parseInt(volumes) : existingManga.volumes,
      chapters: chapters ? parseInt(chapters) : existingManga.chapters,
      author,
      rating: rating ? parseInt(rating) : existingManga.rating,
      genre,
      status,
      // Use new image URL if provided, otherwise keep existing
      image: imageUrl || existingManga.image
    };

    try {
      const manga = await prisma.manga.update({
        where: { id: mangaId },
        data: updatedManga,
      });
      res.json(manga);
    } catch (err) {
      console.error("Error updating manga", err);
      res.status(500).json({ message: "Error updating manga" });
    }
  }
);

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