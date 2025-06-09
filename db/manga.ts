// db/anime.ts
import prisma from './index';

const newManga = {
  title: "test",
  description: "test",
  year: 1990,
  volumes: 78,
  chapters: 90,
  author: "test",
  rating: 10,
  genre: "test",
  status: "test",
  image: "test",
};

interface Manga {
  id: number;
  title: string;
  description: string | null;
  year: number | null;
  volumes: number | null;
  chapters: number | null;
  author: string | null;
  rating: number | null;
  genre: string | null;
  status: string | null;
  image: string | null;
}

async function createManga() {
  try {
    const manga = await prisma.manga.create({
      data: newManga,
    });
    console.log("Success... a new manga was created!!");
    console.log(manga);
  } catch (error) {
    console.log("Something went wrong...");
    console.error(error);
  }
}

createManga();