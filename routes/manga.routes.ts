import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import prisma from '../db/index';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
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

// Create a new manga
router.post(
  '/mangas',
  upload.single('image'), 
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Received POST body:", req.body);
    console.log("Received file:", req.file);

    const { title, year, volumes, chapters, description, author, rating, status, genre } = req.body;
    let imageUrl = null;

    // Handle image upload if present
    if (req.file) {
      const file = req.file;
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('manga-pics')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype
        });

      if (error) {
        console.error('Supabase upload error:', error);
        res.status(500).json({ message: 'Image upload failed' });
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('manga-pics')
        .getPublicUrl(data.path);

      imageUrl = publicUrl;
    }

    const newManga = {
      title,
      description: description || null,
      year: year ? Number(year) : null,
      volumes: volumes ? Number(volumes) : null,
      chapters: chapters ? Number(chapters) : null,
      author: author || null,
      rating: rating ? Number(rating) : null,
      genre: genre || null,
      status: status || null,
      image: imageUrl
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

router.post('/mangas', async (req: Request, res: Response) => {
  try {
    const { title, description, year, volumes, chapters, 
            author, rating, genre, status, imageUrl } = req.body;

    const newManga = {
      title,
      description: description || null,
      year: year ? Number(year) : null,
      // ... other fields
      image: imageUrl, // Store the full Supabase URL directly
      genre: genre || null,
      status: status || null
    };

    const manga = await prisma.manga.create({ data: newManga });
    res.status(201).json(manga);
  } catch (err) {
    console.error('Error creating manga:', err);
    res.status(500).json({ message: 'Error creating manga' });
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
router.put(
  "/mangas/:mangaId",
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    const mangaId = parseInt(req.params.mangaId, 10);

    try {
      const existingManga = await prisma.manga.findUnique({
        where: { id: mangaId }
      });

      if (!existingManga) {
        res.status(404).json({ message: 'Manga not found' });
        return;
      }

      const { title, year, volumes, chapters, description, author, rating, status, genre } = req.body;
      let imageUrl = existingManga.image;

      // Handle new image upload if present
      if (req.file) {
        const file = req.file;
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('manga-pics')
          .upload(fileName, file.buffer, {
            contentType: file.mimetype
          });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('manga-pics')
          .getPublicUrl(data.path);

        imageUrl = publicUrl;
      }

      const updatedManga = {
        title: title || existingManga.title,
        description: description || existingManga.description,
        year: year ? parseInt(year) : existingManga.year,
        volumes: volumes ? parseInt(volumes) : existingManga.volumes,
        chapters: chapters ? parseInt(chapters) : existingManga.chapters,
        author: author || existingManga.author,
        rating: rating ? parseInt(rating) : existingManga.rating,
        genre: genre || existingManga.genre,
        status: status || existingManga.status,
        image: imageUrl
      };

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