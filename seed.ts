import prisma from "./db";

prisma.anime
  .createMany({
    data: [
   {
    title: "Fullmetal Alchemist: Brotherhood",
    description: "Two brothers search for the Philosopher's Stone to restore their bodies.",
    year: 2009,
    episodes: 64,
    studio: "Bones",
    rating: 9,
    genre: "Action, Adventure, Fantasy",
    status: "Finished",
    image: "https://cdn.example.com/fmab.jpg"
  },
  {
    title: "Attack on Titan",
    description: "Humans fight giants to survive behind walls.",
    year: 2013,
    episodes: 87,
    studio: "Wit Studio / MAPPA",
    rating: 9,
    genre: "Action, Drama, Fantasy",
    status: "Finished",
    image: "https://cdn.example.com/aot.jpg"
  },
  {
    title: "Death Note",
    description: "A student discovers a notebook that kills anyone whose name is written in it.",
    year: 2006,
    episodes: 37,
    studio: "Madhouse",
    rating: 9,
    genre: "Mystery, Supernatural, Thriller",
    status: "Finished",
    image: "https://cdn.example.com/deathnote.jpg"
  },
  {
    title: "Steins;Gate",
    description: "A self-proclaimed mad scientist discovers a way to send messages through time.",
    year: 2011,
    episodes: 24,
    studio: "White Fox",
    rating: 9,
    genre: "Sci-Fi, Thriller",
    status: "Finished",
    image: "https://cdn.example.com/steinsgate.jpg"
  },
  {
    title: "Demon Slayer",
    description: "A boy becomes a demon slayer after his family is slaughtered by demons.",
    year: 2019,
    episodes: 55,
    studio: "ufotable",
    rating: 9,
    genre: "Action, Supernatural",
    status: "Ongoing",
    image: "https://cdn.example.com/demonslayer.jpg"
  },
  {
    title: "Jujutsu Kaisen",
    description: "A boy becomes host to a powerful curse and enters a school for sorcerers.",
    year: 2020,
    episodes: 47,
    studio: "MAPPA",
    rating: 9,
    genre: "Action, Supernatural, Horror",
    status: "Ongoing",
    image: "https://cdn.example.com/jujutsukaisen.jpg"
  },
  {
    title: "One Punch Man",
    description: "A superhero who can defeat any opponent with one punch seeks a real challenge.",
    year: 2015,
    episodes: 24,
    studio: "Madhouse / J.C.Staff",
    rating: 8,
    genre: "Action, Comedy",
    status: "Ongoing",
    image: "https://cdn.example.com/opm.jpg"
  },
  {
    title: "My Hero Academia",
    description: "In a world of superheroes, a boy without powers dreams of becoming a hero.",
    year: 2016,
    episodes: 140,
    studio: "Bones",
    rating: 8,
    genre: "Action, Superhero",
    status: "Ongoing",
    image: "https://cdn.example.com/mha.jpg"
  },
  {
    title: "Hunter x Hunter",
    description: "A boy becomes a Hunter to find his missing father.",
    year: 2011,
    episodes: 148,
    studio: "Madhouse",
    rating: 9,
    genre: "Action, Adventure, Fantasy",
    status: "Hiatus",
    image: "https://cdn.example.com/hxh.jpg"
  },
  {
    title: "Mob Psycho 100",
    description: "A powerful psychic tries to live a normal life.",
    year: 2016,
    episodes: 37,
    studio: "Bones",
    rating: 9,
    genre: "Action, Comedy, Supernatural",
    status: "Finished",
    image: "https://cdn.example.com/mobpsycho100.jpg"
  },
  {
    title: "Naruto",
    description: "A young ninja strives to become the strongest and earn recognition.",
    year: 2002,
    episodes: 220,
    studio: "Pierrot",
    rating: 8,
    genre: "Action, Adventure",
    status: "Finished",
    image: "https://cdn.example.com/naruto.jpg"
  },
  {
    title: "Naruto: Shippuden",
    description: "Naruto returns to protect his village from growing threats.",
    year: 2007,
    episodes: 500,
    studio: "Pierrot",
    rating: 8,
    genre: "Action, Adventure",
    status: "Finished",
    image: "https://cdn.example.com/shippuden.jpg"
  },
  {
    title: "One Piece",
    description: "Luffy and his pirate crew sail the seas in search of treasure.",
    year: 1999,
    episodes: 1100,
    studio: "Toei Animation",
    rating: 9,
    genre: "Action, Adventure, Fantasy",
    status: "Ongoing",
    image: "https://cdn.example.com/onepiece.jpg"
  },
  {
    title: "Spy x Family",
    description: "A spy must create a fake family to complete a mission—but things get complicated.",
    year: 2022,
    episodes: 37,
    studio: "Wit Studio / CloverWorks",
    rating: 8,
    genre: "Comedy, Action",
    status: "Ongoing",
    image: "https://cdn.example.com/spyxfamily.jpg"
  },
  {
    title: "Tokyo Ghoul",
    description: "A student becomes a half-ghoul after a deadly encounter.",
    year: 2014,
    episodes: 48,
    studio: "Pierrot",
    rating: 7,
    genre: "Action, Horror, Supernatural",
    status: "Finished",
    image: "https://cdn.example.com/tokyoghoul.jpg"
  },
  {
    title: "Bleach",
    description: "A teenager gains the power to fight evil spirits.",
    year: 2004,
    episodes: 366,
    studio: "Pierrot",
    rating: 8,
    genre: "Action, Supernatural",
    status: "Finished",
    image: "https://cdn.example.com/bleach.jpg"
  },
  {
    title: "Bleach: Thousand-Year Blood War",
    description: "The final arc of Bleach, with new threats and epic battles.",
    year: 2022,
    episodes: 26,
    studio: "Pierrot",
    rating: 9,
    genre: "Action, Supernatural",
    status: "Ongoing",
    image: "https://cdn.example.com/bleach-tybw.jpg"
  },
  {
    title: "Chainsaw Man",
    description: "A young man merges with his pet devil and becomes a devil hunter.",
    year: 2022,
    episodes: 12,
    studio: "MAPPA",
    rating: 9,
    genre: "Action, Horror, Supernatural",
    status: "Ongoing",
    image: "https://cdn.example.com/chainsawman.jpg"
  },
  {
    title: "Code Geass",
    description: "An exiled prince gains a power that allows him to command anyone.",
    year: 2006,
    episodes: 50,
    studio: "Sunrise",
    rating: 10,
    genre: "Mecha, Drama, Sci-Fi",
    status: "Finished",
    image: "https://cdn.example.com/codegeass.jpg"
  },
  {
    title: "Your Lie in April",
    description: "A piano prodigy meets a violinist who changes his world.",
    year: 2014,
    episodes: 22,
    studio: "A-1 Pictures",
    rating: 9,
    genre: "Drama, Music, Romance",
    status: "Finished",
    image: "https://cdn.example.com/yourlieinapril.jpg"
  },
  {
    title: "Violet Evergarden",
    description: "A former soldier learns to express emotions through writing.",
    year: 2018,
    episodes: 13,
    studio: "Kyoto Animation",
    rating: 9,
    genre: "Drama, Slice of Life",
    status: "Finished",
    image: "https://cdn.example.com/violetevergarden.jpg"
  },
  {
    title: "Made in Abyss",
    description: "A girl descends into a mysterious abyss in search of her mother.",
    year: 2017,
    episodes: 25,
    studio: "Kinema Citrus",
    rating: 9,
    genre: "Adventure, Fantasy, Drama",
    status: "Ongoing",
    image: "https://cdn.example.com/madeinabyss.jpg"
  }
    ],
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
