import prisma from "./lib/db";

async function main() {
  const user = await prisma.user.create({
    data: { username: "glowingalien" },
  });

  await prisma.score.create({
    data: { userId: user.id, game: "space-invaders", score: 1234 },
  });

  const scores = await prisma.score.findMany({
    include: { user: true },
  });

  console.log(scores);
}

main().finally(() => process.exit());