import prisma from "@lib/db";

export async function getAllGames() {
  return prisma.game.findMany({
    orderBy: { title: "asc" }
  });
}

export async function getGameBySlug(slug: string) {
  return prisma.game.findUnique({
    where: { slug }
  });
}

export async function getAllGameSlugs() {
  console.log('getAllGameSlugs')

  const games = await prisma.game.findMany({
    select: { slug: true }
  });

  return games.map(g => g.slug);
}