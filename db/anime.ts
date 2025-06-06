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

prisma.anime
  .create({ data: newAnime })
  .then((anime) => {
    console.log("Success... a new anime was created!!");
    console.log(anime);
  })
  .catch((error) => {
    console.log("Something went wrong...");
    console.error(error);
  });