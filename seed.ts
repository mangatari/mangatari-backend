import prisma from "./db";

prisma.manga
  .createMany({
    data: [
{
    title: "Berserk",
    description: "A lone mercenary fights against demonic forces in a dark medieval world.",
    year: 1989,
    volumes: 41,
    chapters: 363,
    author: "Kentaro Miura",
    rating: 9.5,
    genre: "Dark Fantasy, Horror, Action",
    status: "Hiatus",
    image: "https://cdn.example.com/berserk.jpg"
  },
  {
    title: "One Piece",
    description: "A young pirate's quest to become the Pirate King.",
    year: 1997,
    volumes: 103,
    chapters: 1085,
    author: "Eiichiro Oda",
    rating: 9.4,
    genre: "Adventure, Fantasy, Action",
    status: "Ongoing",
    image: "https://cdn.example.com/onepiece.jpg"
  },
  {
    title: "Attack on Titan",
    description: "Humanity's last stand against man-eating giants.",
    year: 2009,
    volumes: 34,
    chapters: 139,
    author: "Hajime Isayama",
    rating: 9.2,
    genre: "Dark Fantasy, Action, Drama",
    status: "Completed",
    image: "https://cdn.example.com/aot.jpg"
  },
  {
    title: "Death Note",
    description: "A genius student gains the power to kill anyone by writing their name.",
    year: 2003,
    volumes: 12,
    chapters: 108,
    author: "Tsugumi Ohba",
    rating: 9.0,
    genre: "Psychological Thriller, Mystery",
    status: "Completed",
    image: "https://cdn.example.com/deathnote.jpg"
  },
  {
    title: "Chainsaw Man",
    description: "A devil hunter merges with his pet devil to become Chainsaw Man.",
    year: 2018,
    volumes: 11,
    chapters: 97,
    author: "Tatsuki Fujimoto",
    rating: 8.9,
    genre: "Action, Dark Fantasy",
    status: "Ongoing",
    image: "https://cdn.example.com/chainsawman.jpg"
  },
  {
    title: "Demon Slayer",
    description: "A boy becomes a demon slayer to avenge his family and cure his sister.",
    year: 2016,
    volumes: 23,
    chapters: 205,
    author: "Koyoharu Gotouge",
    rating: 8.8,
    genre: "Action, Dark Fantasy",
    status: "Completed",
    image: "https://cdn.example.com/demonslayer.jpg"
  },
  {
    title: "Jujutsu Kaisen",
    description: "A student joins a secret organization of Jujutsu sorcerers.",
    year: 2018,
    volumes: 20,
    chapters: 198,
    author: "Gege Akutami",
    rating: 8.7,
    genre: "Action, Supernatural",
    status: "Ongoing",
    image: "https://cdn.example.com/jujutsukaisen.jpg"
  },
  {
    title: "Tokyo Ghoul",
    description: "A college student becomes a half-ghoul after a deadly encounter.",
    year: 2011,
    volumes: 14,
    chapters: 143,
    author: "Sui Ishida",
    rating: 8.6,
    genre: "Dark Fantasy, Horror",
    status: "Completed",
    image: "https://cdn.example.com/tokyoghoul.jpg"
  },
  {
    title: "Vinland Saga",
    description: "A young Viking seeks revenge in the age of Norse expansion.",
    year: 2005,
    volumes: 26,
    chapters: 191,
    author: "Makoto Yukimura",
    rating: 9.1,
    genre: "Historical, Action, Drama",
    status: "Ongoing",
    image: "https://cdn.example.com/vinlandsaga.jpg"
  },
  {
    title: "My Hero Academia",
    description: "A boy without powers in a superpowered world strives to become a hero.",
    year: 2014,
    volumes: 36,
    chapters: 379,
    author: "Kohei Horikoshi",
    rating: 8.5,
    genre: "Superhero, Action",
    status: "Ongoing",
    image: "https://cdn.example.com/mha.jpg"
  },
  {
    title: "Hunter x Hunter",
    description: "A young boy takes the Hunter Exam to find his missing father.",
    year: 1998,
    volumes: 36,
    chapters: 390,
    author: "Yoshihiro Togashi",
    rating: 9.3,
    genre: "Adventure, Fantasy, Action",
    status: "Hiatus",
    image: "https://cdn.example.com/hxh.jpg"
  },
  {
    title: "Fullmetal Alchemist",
    description: "Two brothers search for the Philosopher's Stone to restore their bodies.",
    year: 2001,
    volumes: 27,
    chapters: 108,
    author: "Hiromu Arakawa",
    rating: 9.4,
    genre: "Adventure, Fantasy, Steampunk",
    status: "Completed",
    image: "https://cdn.example.com/fma.jpg"
  },
  {
    title: "Dorohedoro",
    description: "A man with a lizard head searches for his true identity in a chaotic world.",
    year: 2000,
    volumes: 23,
    chapters: 167,
    author: "Q Hayashida",
    rating: 8.7,
    genre: "Dark Fantasy, Horror, Comedy",
    status: "Completed",
    image: "https://cdn.example.com/dorohedoro.jpg"
  },
  {
    title: "JoJo's Bizarre Adventure",
    description: "The multi-generational saga of the Joestar family.",
    year: 1987,
    volumes: 131,
    chapters: 900,
    author: "Hirohiko Araki",
    rating: 8.9,
    genre: "Action, Supernatural",
    status: "Ongoing",
    image: "https://cdn.example.com/jojo.jpg"
  },
  {
    title: "Monster",
    description: "A brilliant neurosurgeon pursues a former patient who became a serial killer.",
    year: 1994,
    volumes: 18,
    chapters: 162,
    author: "Naoki Urasawa",
    rating: 9.2,
    genre: "Psychological Thriller, Mystery",
    status: "Completed",
    image: "https://cdn.example.com/monster.jpg"
  },
  {
    title: "Goodnight Punpun",
    description: "The coming-of-age story of Punpun Onodera and his troubled life.",
    year: 2007,
    volumes: 13,
    chapters: 147,
    author: "Inio Asano",
    rating: 9.0,
    genre: "Slice of Life, Psychological Drama",
    status: "Completed",
    image: "https://cdn.example.com/punpun.jpg"
  },
  {
    title: "Akira",
    description: "A biker gang member gains terrifying psychic powers in Neo-Tokyo.",
    year: 1982,
    volumes: 6,
    chapters: 120,
    author: "Katsuhiro Otomo",
    rating: 9.3,
    genre: "Cyberpunk, Action",
    status: "Completed",
    image: "https://cdn.example.com/akira.jpg"
  },
  {
    title: "Blame!",
    description: "A silent loner explores a vast technological dystopia.",
    year: 1997,
    volumes: 10,
    chapters: 65,
    author: "Tsutomu Nihei",
    rating: 8.8,
    genre: "Cyberpunk, Sci-Fi",
    status: "Completed",
    image: "https://cdn.example.com/blame.jpg"
  },
  {
    title: "Nausicaä of the Valley of the Wind",
    description: "A princess tries to prevent two warring nations from destroying their ecosystem.",
    year: 1982,
    volumes: 7,
    chapters: 59,
    author: "Hayao Miyazaki",
    rating: 9.1,
    genre: "Fantasy, Adventure, Sci-Fi",
    status: "Completed",
    image: "https://cdn.example.com/nausicaa.jpg"
  },
  {
    title: "Uzumaki",
    description: "A town becomes obsessed with spirals with horrific consequences.",
    year: 1998,
    volumes: 3,
    chapters: 20,
    author: "Junji Ito",
    rating: 8.9,
    genre: "Horror, Psychological",
    status: "Completed",
    image: "https://cdn.example.com/uzumaki.jpg"
  },
  {
    title: "Slam Dunk",
    description: "A delinquent joins his high school basketball team.",
    year: 1990,
    volumes: 31,
    chapters: 276,
    author: "Takehiko Inoue",
    rating: 9.0,
    genre: "Sports, Comedy, Drama",
    status: "Completed",
    image: "https://cdn.example.com/slamdunk.jpg"
  },
  {
    title: "Vagabond",
    description: "The fictionalized life of legendary swordsman Miyamoto Musashi.",
    year: 1998,
    volumes: 37,
    chapters: 327,
    author: "Takehiko Inoue",
    rating: 9.3,
    genre: "Historical, Action, Drama",
    status: "Hiatus",
    image: "https://cdn.example.com/vagabond.jpg"
  }
    ],
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
