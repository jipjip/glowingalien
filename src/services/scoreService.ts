import prisma from "../lib/db";

export async function getLeaderboard(gameId: number) {
  return prisma.score.findMany({
    where: { gameId },
    include: {
      user: true
    },
    orderBy: {
      score: "desc"
    },
    take: 10
  });
}

export async function submitScore(userId: number, gameId: number, score: number) {
  return prisma.score.create({
    data: {
      userId,
      gameId,
      score
    }
  });
}