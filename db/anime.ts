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
  title: string;
  description: string;
  year: number;
  episodes: number;
  studio: string;
  rating: number;
  genre: string;
  status: string;
  image: string;
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