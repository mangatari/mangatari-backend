// db/anime.ts
import prisma from './index';

const newAnime = {
  title: "test",
  description: "test",
  year: 1990,
  episodes: 78,
  studio: "test",
  rating: 10,
  genre: "test",
  status: "test",
  image: "test",
};

interface Anime {
  id: number;
  title: string;
  description: string | null;
  year: number | null;
  episodes: number | null;
  studio: string | null;
  rating: number | null;
  genre: string | null;
  status: string | null;
  image: string | null;
}

prisma.anime
  .create({ data: newAnime as Anime })
  .then((anime: Anime) => {
    console.log("Success... a new anime was created!!");
    console.log(anime);
  })
  .catch((error: Error) => {
    console.log("Something went wrong...");
    console.error(error);
  });
// Run a one-time migration to fix existing paths
(async () => {
  await prisma.anime.updateMany({
    where: {
      image: {
        startsWith: '/uploads/'
      }
    },
    data: {
      image: {
        set: await prisma.$queryRaw`regexp_replace(image, '^/uploads/', '')`
      }
    }
  });
})();