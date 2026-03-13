import prisma from "@lib/db";

const games = [
  { slug: "space-invaders", title: "Space Invaders" },
  { slug: "pacman", title: "Pac-Man" },
  { slug: "asteroids", title: "Asteroids" }
];

async function main() {
  for (const gameData of games) {
    await prisma.game.upsert({
      where: { slug: gameData.slug },
      update: {},
      create: gameData
    });
  }

  console.log("Games seeded!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });