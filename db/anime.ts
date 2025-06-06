// demo.js

const prismaClient = require('../Prisma Client/index');

const newAnime = {
    title: "test" ,
    description: "test",
    year: 1990,
    episodes: 78,
    studio: "test",
    rating: 10,
    genre: "test",
    status: "test",
    image: "test"
};

prismaClient.anime
  .create({ data: newAnime })
  .then(anime => {
    console.log('Success... a new book was created!!');
    console.log(anime);
  })
  .catch(error => {
    console.log('Something went wrong...');
    console.log(error);
  });
