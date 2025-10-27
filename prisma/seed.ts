import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.entry.deleteMany();

  await prisma.entry.createMany({
    data: [
      {
        title: "Inception",
        type: "MOVIE",
        director: "Christopher Nolan",
        budget: 160000000,
        location: "Los Angeles",
        duration: 148,
        yearTime: "2010",
      },
      {
        title: "The Dark Knight",
        type: "MOVIE",
        director: "Christopher Nolan",
        budget: 185000000,
        location: "Chicago",
        duration: 152,
        yearTime: "2008",
      },
      {
        title: "Breaking Bad",
        type: "TV_SHOW",
        director: "Vince Gilligan",
        budget: 3000000,
        location: "Albuquerque",
        duration: 47,
        yearTime: "2008-2013",
      },
      {
        title: "Stranger Things",
        type: "TV_SHOW",
        director: "The Duffer Brothers",
        budget: 6000000,
        location: "Atlanta",
        duration: 51,
        yearTime: "2016-present",
      },
    ],
  });

  console.log("Database seeded successfully with 2 movies and 2 TV shows!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
